const { CreateOrderService } = require('../services/OrderController');

exports.CreateOrder = async (req, res) => {
    const result = await CreateOrderService(req);
    res.status(200).json({status: "successful response", data: result});
};
