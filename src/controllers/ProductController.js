const {
  GetImagesByProductId,
  InsertProductImageQuery,
  ProductSearchServices,
  ProductInsertServices,
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
  try {
    const {
      name,
      sku,
      barcode,
      brand_id,
      category_id,
      price,
      description,
      status
    } = req.body;

    let main_image = '';
    if (req.file) {
      main_image = `${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;
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
      main_image
    });

    res.status(201).json({ success: true, data: result });

  } catch (error) {

    if (req.file) {
      const filePath = path.join(__dirname, '../../uploads/products', req.file.filename);
      console.log('Image path to delete:', filePath);
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
