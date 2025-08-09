const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const BrandController = require('../controllers/BrandController');
const ProductController = require('../controllers/ProductController');
const upload = require('../middlewares/multer');
const TagController = require('../controllers/TagController');
const ProductSpecsController = require('../controllers/ProductSpecificationController');
const UserController = require('../controllers/UserController');
const AuthVerification = require('../middlewares/AuthVerification');

// product 
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
router.post('/ProductInsert/:folder', (req, res, next) => {
  req.dynamicFolder = req.params.folder;
  next();
}, upload.single('main_image'), ProductController.ProductInsert);
router.get('/ProductListByBrand/:brandId', ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:catId', ProductController.ProductListByCategory);
router.get('/listBySimilarProduct/:productId', ProductController.listBySimilarProduct);
router.get('/TagByProduct/:productId', ProductController.TagByProduct);
router.post('/CreateProductSpecification', ProductSpecsController.CreateProductSpecification);
router.get('/ProductListSorted', ProductController.ProductListSorted);  // create after user & review ready 


// Tag
router.post('/TagCreate', TagController.TagCreate)  
router.post('/ProductTagCreate', TagController.ProductTagCreate)
router.get('/listProductByTags/:tagId', TagController.listProductByTags)

// User
router.post('/CreateRole', UserController.CreateRole);
router.get('/UserOTP/:email', UserController.UserOTP);
router.get('/UserVerifyLoginCustomer', UserController.UserVerifyLoginCustomer);
router.get('/UserLogout',AuthVerification, UserController.UserLogout)




module.exports = router;
