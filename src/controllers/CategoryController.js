const {CategoryServices, CreateCategoryServices} = require('../services/CategoryController');

exports.ProductCategoryList = async(req, res) => {
    let result = await CategoryServices();
    return res.status(200).json(result)
}
exports.CreateCategory = async(req, res) => {
    const reqBody = req.body;
    console.log(reqBody)
    let result = await CreateCategoryServices(reqBody);
    return res.status(201).json(result);
}