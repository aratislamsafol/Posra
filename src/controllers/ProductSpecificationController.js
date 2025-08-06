const {CreateProductSpecificationServices} = require('../services/ProductSpecificationController');
exports.CreateProductSpecification = async(req, res) => {
    try{
        const getReqData = await CreateProductSpecificationServices(req.body);
        res.status(200).json(getReqData);
    }
    catch(err) {
        return {status: "Failed to Get Req", data: err.message}
    }
}