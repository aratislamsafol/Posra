const ProductImg = require("../models/ProductImg");
const ProductModel = require("../models/Products");
const mongoose = require("mongoose");
const ProductTagModel = require("../models/ProductTags");
const TagModel = require("../models/TagsModel");
const ProductSpecsModel = require('../models/ProductSpecs');
const ObjectId = mongoose.Types.ObjectId;


const GetImagesByProductId = async (productId) => {
  // validation
  if (!ObjectId.isValid(productId)) {
    return { status: "fail", data: "Invalid product ID" };
  }

  try {
    const result = await ProductImg.find({
      product_id: new ObjectId(productId),
    });
    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err.message };
  }
};

const InsertProductImageQuery = async (productId, image_urls) => {
  // Validate productId
  if (!ObjectId.isValid(productId)) {
    return { status: "fail", data: "Invalid product ID" };
  }

  try {
    const newProductImg = new ProductImg({
      product_id: new ObjectId(productId),
      image_urls,
    });

    const saved = await newProductImg.save();
    return { status: "success", data: saved };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

const ProductSearchServices = async (req) => {
  try {
    const {
      name,
      sku,
      brand_id,
      category_id,
      status,
      price,
      min_price,
      max_price,
      start_date,
      end_date,
      sort_by = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const searchQuery = {};

    if (name) searchQuery.name = { $regex: name, $options: "i" };
    if (sku) searchQuery.sku = { $regex: sku, $options: "i" };
    if (brand_id) searchQuery.brand_id = brand_id;
    if (category_id) searchQuery.category_id = category_id;
    if (status) searchQuery.status = status;
    if (price) searchQuery.price = Number(price);

    if (max_price || min_price) {
      searchQuery.price = {};
      if (min_price) searchQuery.price.$gte = Number(min_price);
      if (max_price) searchQuery.price.$lte = Number(max_price);
    }

    if (start_date || end_date) {
      searchQuery.createdAt = {};
      if (start_date) searchQuery.createdAt.$gte = new Date(start_date);
      if (end_date) searchQuery.createdAt.$lte = new Date(end_date);
    }

    const sortOrder = order === "desc" ? -1 : 1;
    const sortOptions = { [sort_by]: sortOrder };

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const products = await ProductModel.find(searchQuery)
      .populate("brand_id", "name")
      .populate("category_id", "name")
      .select("name sku price barcode status main_image createdAt")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    const total = await ProductModel.countDocuments(searchQuery);

    return {
      status: "success",
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: products,
    };
  } catch (err) {
    return { status: "Failed to Product Search", data: err.message };
  }
};

const ProductInsertServices = async (reqBody) => {
  try {
    const {
      name,
      sku,
      barcode,
      brand_id,
      category_id,
      price,
      description,
      status,
      main_image,
      folder,
      tags,
      specification_field, 
      size,
      value,
      unit,
      values,
      long_description,
      is_optional,
    } = reqBody;

    const data = await ProductModel.create({
      name,
      sku,
      barcode,
      brand_id,
      category_id,
      price,
      description,
      status,
      main_image,
      folder,
    });

    //  ensure tags is array
    let finalTags = [];
    if (typeof tags === "string") {
      finalTags = tags.split(",").map(tag => tag.trim());
    } else if (Array.isArray(tags)) {
      finalTags = tags;
    }

    if (finalTags.length > 0) {
      await Promise.all(
        finalTags.map(async (tag) => {
          let existingTag = await TagModel.findOne({ name: tag });
          if (!existingTag) {
            existingTag = await TagModel.create({ name: tag });
          }

          await ProductTagModel.create({
            product_id: data._id,
            tag_id: existingTag._id,
          });
        })
      );
    }
    // Product Description
    if (specification_field && value) {
      await ProductSpecsModel.create({
        product_id: data._id,
        specification_field,
        size: Array.isArray(size) ? size : undefined,
        value,
        values: Array.isArray(values) ? values : undefined,
        unit,
        description: long_description || null,
        is_optional: is_optional || false,
      })};

    return { status: "Successfully Added Product", data: data };
  } catch (error) {
    throw new Error(error.message);
  }
};

const ListByBrandService = async (req) => {
  try {
    const BrandID = new ObjectId(req.params.brandId);
    let MatchStage = { $match: { brand_id: BrandID } };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brand_id",
        foreignField: "_id",
        as: "brand",
      },
    };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        category_id: 0,
        brand_id: 0,
      },
    };

    const result = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

const ListByCategoryService = async (req) => {
  try {
    const categoryId = new ObjectId(req.params.catId);
    const MatchStage = { $match: { category_id: categoryId } };

    const JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category",
      },
    };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brand_id",
        foreignField: "_id",
        as: "brand",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        category_id: 0,
        brand_id: 0,
      },
    };

    const result = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: e.message };
  }
};

const listBySimilarProductService = async (req) => {
  try {
    const productId = new ObjectId(req.params.productId);
    const targetProduct = await ProductModel.findById(productId);
    const MatchState = {
      $match: {
        _id: { $ne: productId },
        price: {
          $gte: targetProduct.price * 0.6,
          $lte: targetProduct.price * 1.5,
        },
        category_id: targetProduct.category_id,
        brand_id: targetProduct.brand_id,
      },
    };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brand_id",
        foreignField: "_id",
        as: "brand",
      },
    };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        category_id: 0,
        brand_id: 0,
      },
    };
    const result = await ProductModel.aggregate([
      MatchState,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectStage,
      { $limit: 10 },
    ]);
    return { status: "success", data: result };
  } catch (err) {
    return { status: "fail", data: err.message };
  }
};

const TagByProductServices = async (req) => {
  try {
    const productId = new ObjectId(req.params.productId);

    const productTags = await ProductTagModel.find({
      product_id: productId,
    }).populate("tag_id", "name");
    const tags = productTags.map((item) => item.tag_id);

    return { status: "success", data: tags };
  } catch (err) {
    return { status: "fail", data: err.message };
  }
};
// 



module.exports = {
  GetImagesByProductId,
  InsertProductImageQuery,
  ProductSearchServices,
  ProductInsertServices,
  ListByBrandService,
  ListByCategoryService,
  listBySimilarProductService,
  TagByProductServices,
};
