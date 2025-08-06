const ProductSpecsModel = require('../models/ProductSpecs');

const CreateProductSpecificationServices = async(reqData) => {
    try {
        const result = await ProductSpecsModel.create(reqData);
        return { status: "success", data: result };
    }
    catch(err) {
        return { status: "fail", data: err.message };
    }
}

module.exports = {
    CreateProductSpecificationServices
}