const CategoryModel = require('../models/CategoriesModel');

const CategoryServices = async ()=>{
    try{
        let result = await CategoryModel.find();
        return {status: 'success', data: result}
    }
    catch(err) {
        return {status: 'fail', data: err.toString()}
    }
}

const CreateCategoryServices = async(reqBody) => {
    try{
        const data = await CategoryModel.create(reqBody);
        return {status: 'Successfully Added Category', data: data}
    } 
    catch(err) {
        throw new Error(err.message);
    }
}

module.exports = {
    CategoryServices,
    CreateCategoryServices
}