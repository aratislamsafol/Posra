const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const BrandController = require('../controllers/BrandController');
const ProductController = require('../controllers/ProductController');
const upload = require('../middlewares/multer');

router.get('/ProductBrandList', BrandController.ProductBrandList);
router.get('/ProductCategoryList', CategoryController.ProductCategoryList);
router.get('/GetProductImageController/:productId', ProductController.GetProductImageController);
router.post('/ProductImgInsert/:productId', ProductController.ProductImgInsert);
router.post('/CreateBrand', BrandController.CreateBrand);
router.post('/CreateCategory/:folder', (req, res, next) => {
  req.dynamicFolder = req.params.folder;
  next();
}, upload.single('image_url'), CategoryController.CreateCategory);
router.get('/ProductSearchList', ProductController.ProductSearchList);
router.post('/ProductInsert', upload.single('main_image'), ProductController.ProductInsert);





module.exports = router;
