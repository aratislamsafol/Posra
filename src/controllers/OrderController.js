const PaymentSettingModel = require("../models/PaymentSettingModel");
const {
  CreateOrderService,
  PaymentSuccessServices,
  PaymentFailServices,
  PaymentCancelServices,
  getOrdersByRoleService,
} = require("../services/OrderController");

exports.CreateOrder = async (req, res) => {
  try {
    const result = await CreateOrderService(req);

    if (result.status === "fail") {
      return res.status(400).json({ error: result.message });
    }

    res.status(200).json({
      status: "success",
      message: result.message,
      order_id: result.order_id,
      order_number: result.order_number,
      sslcommerz: result.sslcommerz,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByRoleController = async (req, res) => {
  try {
    const orders = await getOrdersByRoleService(req.user, req.userRole);
    return res.json({ role: req.userRole, orders });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.PaymentSettingCreate = async (req, res) => {
  const data = await PaymentSettingModel.create(req.body);
  res.status(200).json({ status: "success", data: data });
};

exports.PaymentSuccess = async (req, res) => {

      // const data = await PaymentSuccessServices(req);
    res.status(200).json({status: "success", data: req.params.tran_id});
};

exports.PaymentFail = async (req, res) => {
  const data = await PaymentFailServices(req);
  return res.redirect("/orders");
};

exports.PaymentCancel = async (req, res) => {
  const data = await PaymentCancelServices(req);
  return res.redirect("/orders");
};
