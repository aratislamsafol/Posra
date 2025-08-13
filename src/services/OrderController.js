const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const CartModel = require('../models/CartModel');
const OrderModel = require('../models/OrdersModel');
const OrderItemsModel = require('../models/OrderItemsModel');
const OrderAddressModel = require('../models/AddressModel');
const OrderPaymentModel = require('../models/OrderPayment');
const OrderStatusHistoryModel = require('../models/OrderStatusHistoryModel');
const PaymentLogModel = require('../models/PaymentLogsModel');

const CreateOrderService = async (req) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user_id = req.headers.user_id;
    const cart = await CartModel.findOne({ user_id }).session(session);

    console.log(cart);
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Calculation
    const subTotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxPercent = req.body.taxPercent || 0;
    const shippingCost = req.body.shippingCost || 0;
    const discount = req.body.discount || 0;

    const taxAmount = subTotal * taxPercent;
    const grandTotal = subTotal + taxAmount + shippingCost - discount;

    //  Create Order
    const order = await OrderModel.create([{
      user_id,
      order_number: nanoid(8),
      subtotal: subTotal,
      tax: taxAmount,
      shipping_cost: shippingCost,
      discount,
      grand_total: grandTotal,
      payment_status: "Pending",
      order_status: "Pending"
    }], { session });

    const order_id = order[0]._id;

    //  Create OrderItems
    const orderItems = cart.items.map(item => ({
      order_id,
      product_id: item.product_id,
      spec_id: item.spec_id,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    }));

    await OrderItemsModel.insertMany(orderItems, { session });

    // Save Shipping Address
    if (req.body.shipping_address) {
      await OrderAddressModel.create([{
        order_id,
        ...req.body.shipping_address
      }], { session });
    }

    // Payment Info
    if (req.body.payment_method) {
      await OrderPaymentModel.create([{
        order_id,
        method: req.body.payment_method,
        amount: grandTotal,
        status: "Pending",
        payment_date: null
      }], { session });

      // Payment Log
       await PaymentLogModel.create([{
        order_id,
        gateway: req.body.payment_method,
        amount: grandTotal,
        status: "Pending",
        attempt_no: 1,
        currency: "BDT",
        created_at: new Date()
      }], { session });
    }

    // Order Status History
    await OrderStatusHistoryModel.create([{
      order_id,
      status: "Pending",
      note: "Order created"
    }], { session });

    // Clear Cart
    await CartModel.deleteOne({ user_id }).session(session);

    await session.commitTransaction();
    session.endSession();

    return {
      status: "success",
      message: "Order created successfully",
      order_id,
      order_number: order[0].order_number
    };

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return { status: "fail", message: err.message };
  }
};

module.exports = { CreateOrderService };
