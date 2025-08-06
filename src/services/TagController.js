const TagModel = require("../models/TagsModel");
const ProductTagModel = require("../models/ProductTags");
const ProductModel = require("../models/Products");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const TagCreteServices = async(getTagData) =>{
    try {
        const data = await TagModel.create(getTagData);
        return {status: 'Successfully Added Category', data: data} 
    }
    catch(error) {
        throw new Error(error.message);
    }
}

const ProductTagCreateService = async ({ productId, tagId }) => {
  const isProductExist = await ProductModel.exists({ _id: productId });
  if (!isProductExist) {
    throw new Error("Invalid Product ID");
  }

  const isTagExist = await TagModel.exists({ _id: tagId });
  if (!isTagExist) {
    throw new Error("Invalid Tag ID");
  }

  const result = await ProductTagModel.create({
    product_id: productId,
    tag_id: tagId
  });

  return result;
};

const listProductByTagServices = async(req) => {
    try{
      const getTagId = new ObjectId(req.params.tagId);

      const result = await ProductTagModel.aggregate([
        {$match: {tag_id: getTagId}},
        {
          $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: '_id',
            as: 'product'
          }
        }, 
        {
          $lookup: {
            from: 'tags',
            localField: 'tag_id',
            foreignField: '_id',
            as: 'tagItem'
          }
        }, 
        {$unwind: "$product"},
        {$unwind: "$tagItem"},
        {
          $project: {
            "product._id": 0,
            "tagItem._id": 0,
            product_id: 0,
            tag_id: 0
          }
        }
        
      ]);

      return { status: "success", data: result };
    }
    catch(err) {
      return { status: "fail", data: err.message };
    }
}

module.exports = {
    TagCreteServices,
    ProductTagCreateService,
    listProductByTagServices
}