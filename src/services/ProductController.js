const ProductImg = require("../models/ProductImg");
const ProductModel = require("../models/Products");
const mongoose = require("mongoose");
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
  try{
    const data = await ProductModel.create(reqBody); 
    return {status: 'Successfully Added Category', data: data} 
  }
  catch(error) {
    throw new Error(error.message);
  }
};


module.exports = {
  GetImagesByProductId,
  InsertProductImageQuery,
  ProductSearchServices,
  ProductInsertServices
};
