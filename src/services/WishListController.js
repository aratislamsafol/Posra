const WishModel = require("../models/Wishlists");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

const WishListService = async (req) => {
  try {
    let user_id = new ObjectID(req.headers.user_id);
    let matchStage = { $match: { user_id: user_id } };

    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" };

    let JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brand_id",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };

    let JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.category_id",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };

    let JoinProductSpecification = {
      $lookup: {
        from: "productspecs",
        localField: "product._id",
        foreignField: "product_id",
        as: "productSpecification",
      },
    };
    let unwindProductSpecStage = {$unwind: { path: "$productSpecification", preserveNullAndEmptyArrays: true }};

    let JoinProductImage = {
      $lookup: {
        from: "productimages",
        localField: "product._id",
        foreignField: "product_id",
        as: "productImage",
      },
    };
    let unwindProductImage = { 
    $unwind: { path: "$productImage", preserveNullAndEmptyArrays: true } 
};

    let JoinProductTags = {
      $lookup: {
        from: "producttags",
        localField: "product._id",
        foreignField: "product_id",
        as: "productTags",
      },
    };


        let unwindProductTags = { 
    $unwind: { path: "$productTags", preserveNullAndEmptyArrays: true } 
};

    let projectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        createdAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.category_id": 0,
        "product.brand_id": 0,
        "brand._id": 0,
        "category._id": 0,
        "productTags._id": 0,
      },
    };

    let data = await WishModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      JoinProductSpecification,
      unwindProductSpecStage,
      JoinProductImage,
      unwindProductImage,
      JoinProductTags,
      unwindProductTags,
      projectionStage,
    ]);
    console.log(data);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const SaveWishListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.user_id = user_id;
    await WishModel.updateOne(reqBody, { $set: reqBody }, { upsert: true });
    return { status: "success", message: "Wish List Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

const RemoveWishListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.user_id = user_id;
    await WishModel.deleteOne(reqBody);
    return { status: "success", message: "Wish List Remove Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

module.exports = {
  WishListService,
  SaveWishListService,
  RemoveWishListService,
};
