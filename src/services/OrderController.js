const OrderModel = require('../models/OrdersModel');
const OrderItemsModel = require('../models/OrderItemsModel');
const CartModel = require('../models/CartModel');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');


const CreateOrderService = async(req) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    // taxPercent
    try{
        const user_id = req.headers.user_id;
        const cartItems = await CartModel.find({user_id}).session(session);

        if(!cartItems || cartItems[0].items.length == 0) {
            throw new Error("Cart is Empty");
        }

        const subTotal = cartItems[0].items.reduce((acc, item)=> acc + (item.price * item.quantity), 0)
        const taxAmount = subTotal * req.body.taxPercent;
        const shippingCost = req.body.shippingCost || 0;
        const discount = req.body.discount || 0;

        const grandTotal = subTotal + taxAmount + shippingCost - discount;

        const order = await OrderModel.create([{
            user_id, 
            order_number: nanoid(8),
            subtotal: subTotal,
            tax: taxAmount,
            shipping_cost: shippingCost,
            discount: req.body.discount,
            grand_total: grandTotal,
            payment_status: "Pending",
            order_status: "Pending",
        }],  { session });

        const orderItems = cartItems[0].items.map((item) => ({
            order_id: order[0]._id,
            product_id: item.product_id,
            spec_id: item.spec_id,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        }));

        await OrderItemsModel.insertMany(orderItems, { session });

        // Cart clear
        await CartModel.deleteOne({ user_id }).session(session);

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        return {
            status: "success",
            message: "Order created successfully",
            order_id: order[0]._id,
            order_number: order[0].order_number
        };
    }
    catch(err) {
        await session.abortTransaction();
        session.endSession();
        return {status: "fail", message: err.message}
    }

}

module.exports = {
    CreateOrderService
}