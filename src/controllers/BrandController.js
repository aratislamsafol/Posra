const {BrandListServices, CreateBrandServices} = require('../services/BrandController');

exports.ProductBrandList = async(req, res) => {
    let result = await BrandListServices();
    return res.status(200).json(result)
}

exports.CreateBrand = async(req, res) => {
    const reqBody = req.body;
    let result = await CreateBrandServices(reqBody);
    return res.status(201).json(result);
}