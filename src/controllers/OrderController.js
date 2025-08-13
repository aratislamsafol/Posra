const { CreateOrderService } = require('../services/OrderController');

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
      order_number: result.order_number
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
