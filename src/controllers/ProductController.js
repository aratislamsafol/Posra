const {
  GetImagesByProductId,
  InsertProductImageQuery,
  ProductSearchServices,
  ProductInsertServices,
  ListByBrandService,
  ListByCategoryService,
  listBySimilarProductService,
  TagByProductServices
} = require("../services/ProductController");
const fs = require('fs/promises');
const path = require('path');

exports.GetProductImageController = async (req, res) => {
  const product_id = req.params.productId;

  const result = await GetImagesByProductId(product_id);
  return res.status(result.status === "success" ? 200 : 400).json(result);
};

exports.ProductImgInsert = async (req, res) => {
  const product_id = req.params.productId;
  const { image_urls } = req.body;

  const result = await InsertProductImageQuery(product_id, image_urls);
  return res.status(result.status === "success" ? 201 : 400).json(result);
};

exports.ProductSearchList = async (req, res) => {
  const data = await ProductSearchServices(req);
  res.status(200).json(data);
};

exports.ProductInsert = async (req, res) => {
  const folder = req.dynamicFolder || "others";
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
      tags, 
      specification_field, 
      size,
      value,
      unit,
      values,
      long_description,
      is_optional,
    } = req.body;

    let main_image = "";
    if (req.file) {
      main_image = `${req.protocol}://${req.get("host")}/uploads/${folder}/${req.file.filename}`;
    }

    const result = await ProductInsertServices({
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
    });

    res.status(201).json({ success: true, data: result });

  } catch (error) {

    if (req.file) {
      const filePath = path.join(__dirname, `../../uploads/${folder}`, req.file.filename);
      try {
        await fs.unlink(filePath);
        console.log('Image deleted due to failed insert');
      } catch(err) {
        console.error('Image delete failed:', err.message);
      }
    }

    res.status(400).json({ success: false, message: error.message });
  }
};

exports.ProductListByBrand = async(req, res) => {
  const data = await ListByBrandService(req);
  res.status(200).json(data)
}

exports.ProductListByCategory = async(req, res) => {
  const data = await ListByCategoryService(req);
  res.status(200).json(data)
}

exports.listBySimilarProduct = async(req, res) => {
  const data = await listBySimilarProductService(req);
  res.status(200).json(data)
}

exports.TagByProduct = async (req, res) => {
    try {
      const data = await TagByProductServices(req);
      res.status(200).json({ status: "success in TagByProduct Response", data: data });
    } catch (err) {
      res.status(400).json({ status: "failed", message: err.message });
  }
};

exports.ProductListSorted = async (req, res) => {
  try {
    let sortBy = req.query.sort || 'createdAt_desc';

    let sortOptions = {};

    switch (sortBy) {
      case 'price_asc':
        sortOptions.price = 1;
        break;
      case 'price_desc':
        sortOptions.price = -1;
        break;
      case 'name_asc':
        sortOptions.name = 1;
        break;
      case 'name_desc':
        sortOptions.name = -1;
        break;
      case 'createdAt_asc':
        sortOptions.createdAt = 1;
        break;
      case 'createdAt_desc':
        sortOptions.createdAt = -1;
        break;
      // case 'rating_desc':
      //   sortOptions.rating = -1;
      //   break;
      // case 'rating_asc':
      //   sortOptions.rating = 1;
      //   break;
      // case 'most_sold':
      //   sortOptions.rating = 1;
      //   break;  
      default:
        sortOptions.createdAt = -1;
    }

    const products = await ProductModel.find().sort(sortOptions);

    res.status(200).json({
      status: "success",
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};







