const BrandModel = require('../models/BrandsModel');

const BrandListServices = async ()=>{
    try{
        let result = await BrandModel.find();
        return {status: 'success', data: result}
    }
    catch(err) {
        return {status: 'fail', data: err.toString()}
    }
}

const CreateBrandServices = async(reqBody) => {
    try {
        const data = await BrandModel.create(reqBody)
        return {status: "successfully Data Created", data: data}
    }
     catch(err) {
        return {status: 'fail', data: err.toString()}
    }
}
module.exports = {
    BrandListServices,
    CreateBrandServices
}