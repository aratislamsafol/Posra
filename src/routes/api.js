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
router.post('/CreateCategory', CategoryController.CreateCategory);
router.get('/ProductSearchList', ProductController.ProductSearchList);
router.post('/ProductInsert', upload.single('main_image'), ProductController.ProductInsert);





module.exports = router;
