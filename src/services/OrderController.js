const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const axios = require("axios");
const FormData = require("form-data");

const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrdersModel");
const OrderItemsModel = require("../models/OrderItemsModel");
const OrderAddressModel = require("../models/AddressModel");
const OrderPaymentModel = require("../models/OrderPayment");
const OrderStatusHistoryModel = require("../models/OrderStatusHistoryModel");
const PaymentLogModel = require("../models/PaymentLogsModel");
const PaymentSettingModel = require("../models/PaymentSettingModel");
const UserModel = require("../models/User");
const AddressModel = require("../models/AddressModel");

const CreateOrderService = async (req) => {
  const session = await mongoose.startSession();
  let order_id, order_number, grandTotal;
  try {
    session.startTransaction();

    const user_id = req.headers.user_id;
    const cart = await CartModel.findOne({ user_id }).session(session);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Calculate totals
    const subTotal = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const taxPercent = req.body.taxPercent || 0;
    const shippingCost = req.body.shippingCost || 0;
    const discount = req.body.discount || 0;

    const taxAmount = subTotal * taxPercent;
    grandTotal = subTotal + taxAmount + shippingCost - discount;

    // Create Order
    const order = await OrderModel.create(
      [
        {
          user_id,
          order_number: nanoid(8),
          subtotal: subTotal,
          tax: taxAmount,
          shipping_cost: shippingCost,
          discount,
          grand_total: grandTotal,
          payment_status: "Pending",
          order_status: "Pending",
        },
      ],
      { session }
    );

    order_id = order[0]._id;
    order_number = order[0].order_number;

    // Create Order Items
    const orderItems = cart.items.map((item) => ({
      order_id,
      product_id: item.product_id,
      spec_id: item.spec_id,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    }));
    await OrderItemsModel.insertMany(orderItems, { session });

    // Save Shipping Address
    if (req.body.shipping_address) {
      await OrderAddressModel.create(
        [
          {
            order_id,
            ...req.body.shipping_address,
          },
        ],
        { session }
      );
    }

    // Payment Info & Log
    if (req.body.payment_method) {
      await OrderPaymentModel.create(
        [
          {
            order_id,
            method: req.body.payment_method,
            transaction_id: order_id.toString(),
            amount: grandTotal,
            status: "Pending",
            payment_date: null,
          },
        ],
        { session }
      );

      await PaymentLogModel.create(
        [
          {
            order_id,
            gateway: req.body.payment_method,
            amount: grandTotal,
            status: "Pending",
            attempt_no: 1,
            currency: "BDT",
            created_at: new Date(),
          },
        ],
        { session }
      );
    }

    // Order Status History
    await OrderStatusHistoryModel.create(
      [
        {
          order_id,
          status: "Pending",
          note: "Order created",
        },
      ],
      { session }
    );

    // Clear Cart
    await CartModel.deleteOne({ user_id }).session(session);

    // Commit Transaction
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return { status: "fail", message: err.message };
  }

  session.endSession();

  // Post-Transaction: Payment Init
  try {
    const PaymentSettings = await PaymentSettingModel.find();

    // Fetch User Data
    const UserMatchStage = {
      $match: { _id: new mongoose.Types.ObjectId(req.headers.user_id) },
    };
    const ConnectStage = {
      $lookup: {
        from: "userprofiles",
        localField: "_id",
        foreignField: "user_id",
        as: "Profile",
      },
    };
    const UnwindUserProfile = {
      $unwind: { path: "$Profile", preserveNullAndEmptyArrays: true },
    };

    const UserData = await UserModel.aggregate([
      UserMatchStage,
      ConnectStage,
      UnwindUserProfile,
    ]);

    // Fetch Shipment Data
    const ShipmentQuery = await AddressModel.find({
      order_id: new mongoose.Types.ObjectId(order_id),
    });

    // FormData for SSLCommerz
    const form = new FormData();
    form.append("store_id", PaymentSettings[0].store_id);
    form.append("store_passwd", PaymentSettings[0].store_passwd);
    form.append("total_amount", grandTotal);
    form.append("currency", PaymentSettings[0].currency);
    form.append("tran_id", order_id.toString());
    form.append("success_url", `${PaymentSettings[0].success_url}/${order_id.toString()}`);
    form.append("fail_url", `${PaymentSettings[0].fail_url}/${order_id.toString()}`);
    form.append("cancel_url", `${PaymentSettings[0].cancel_url}/${order_id.toString()}`);
    form.append("ipn_url", `${PaymentSettings[0].ipn_url}`);

    // Customer Info
    form.append("cus_name", UserData[0]?.name || "");
    form.append("cus_email", UserData[0]?.email || "");
    form.append("cus_add1", UserData[0]?.Profile?.address_line1 || "");
    form.append("cus_add2", UserData[0]?.Profile?.address_line2 || "");
    form.append("cus_city", UserData[0]?.Profile?.city || "");
    form.append("cus_state", UserData[0]?.Profile?.state || "");
    form.append("cus_postcode", UserData[0]?.Profile?.postal_code || "");
    form.append("cus_country", UserData[0]?.Profile?.country || "");
    form.append("cus_phone", UserData[0]?.phone || "");

    // Shipment Info
    if (ShipmentQuery.length > 0) {
      form.append("shipping_method", "YES");
      form.append("ship_name", ShipmentQuery[0].name || "");
      form.append("ship_add1", ShipmentQuery[0].address_line1 || "");
      form.append("ship_add2", ShipmentQuery[0].address_line2 || "");
      form.append("ship_city", ShipmentQuery[0].city || "");
      form.append("ship_state", ShipmentQuery[0].state || "");
      form.append("ship_country", ShipmentQuery[0].country || "");
      form.append("ship_postcode", ShipmentQuery[0].postal_code || "");
      form.append("ship_area", ShipmentQuery[0].address_line1 || "");
    }

    // Product Info (generalized)
    form.append("product_name", "According Order");
    form.append("product_category", "According Order");
    form.append("product_profile", "According Order");

    // Call SSLCommerz
    const SSLRes = await axios.post(PaymentSettings[0]["init_url"], form, {
      headers: form.getHeaders(),
    });

    return {
      status: "success",
      message: "Order created Successfully",
      order_id,
      order_number,
      sslcommerz: SSLRes.data,
    };
  } catch (err) {
    return {
      status: "fail",
      message: "Order created but payment init failed",
      error: err.response?.data || err.message,
    };
  }
};

const getOrdersByRoleService = async (user, roleName) => {
  let orders;

  switch (roleName) {
    case "admin":
    case "manager":
      orders = await OrderModel.find({});
      break;

    case "customer":
      orders = await OrderModel.find({ user_id: user._id });
      break;

    case "supplier":
      orders = await OrderModel.find({ supplier_id: user._id });
      break;

    case "staff":
      orders = await OrderModel.find({ staff_id: user._id });
      break;

    default:
      throw new Error("Not authorized for orders");
  }

  return orders;
};

const PaymentSuccessServices = async(req) => {
  try{
    let trxID = req.params.tran_id;
    console.log("Browser redirect trxID:", trxID);
    const result = await OrderPaymentModel.updateOne({transaction_id: trxID}, {status: "Completed"})

    return {status:"success"}
  
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

module.exports = { CreateOrderService, getOrdersByRoleService, PaymentSuccessServices };
