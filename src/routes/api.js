const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const BrandController = require("../controllers/BrandController");
const ProductController = require("../controllers/ProductController");
const upload = require("../middlewares/multer");
const TagController = require("../controllers/TagController");
const ProductSpecsController = require("../controllers/ProductSpecificationController");
const UserController = require("../controllers/UserController");
const AuthVerification = require("../middlewares/AuthVerification");
const EmailController = require("../controllers/EmailController");
const WishListController = require("../controllers/WishListController");
const CartController = require("../controllers/CartController");
const OrderController = require("../controllers/OrderController");
const {CheckRole}  = require("../middlewares/RoleAuthVerification");
// product
router.get("/ProductBrandList", BrandController.ProductBrandList);
router.get("/ProductCategoryList", CategoryController.ProductCategoryList);
router.get(
  "/GetProductImageController/:productId",
  ProductController.GetProductImageController
);
router.post("/ProductImgInsert/:productId", ProductController.ProductImgInsert);
router.post("/CreateBrand", BrandController.CreateBrand);
router.post(
  "/CreateCategory/:folder",
  (req, res, next) => {
    req.dynamicFolder = req.params.folder;
    next();
  },
  upload.single("image_url"),
  CategoryController.CreateCategory
);
router.get("/ProductSearchList", ProductController.ProductSearchList);
router.post(
  "/ProductInsert/:folder",
  (req, res, next) => {
    req.dynamicFolder = req.params.folder;
    next();
  },
  upload.single("main_image"),
  ProductController.ProductInsert
);
router.get(
  "/ProductListByBrand/:brandId",
  ProductController.ProductListByBrand
);
router.get(
  "/ProductListByCategory/:catId",
  ProductController.ProductListByCategory
);
router.get(
  "/listBySimilarProduct/:productId",
  ProductController.listBySimilarProduct
);
router.get("/TagByProduct/:productId", ProductController.TagByProduct);
router.post(
  "/CreateProductSpecification",
  ProductSpecsController.CreateProductSpecification
);
router.get("/ProductListSorted", ProductController.ProductListSorted); // create after user & review ready

// Tag
router.post("/TagCreate", TagController.TagCreate);
router.post("/ProductTagCreate", TagController.ProductTagCreate);
router.get("/listProductByTags/:tagId", TagController.listProductByTags);

// User
router.post("/CreateRole", UserController.CreateRole);
router.get("/UserOTP/:email", UserController.UserOTP);
router.get("/UserVerifyLoginCustomer", UserController.UserVerifyLoginCustomer);
router.post("/LoginWithPassword", UserController.LoginWithPassword);
router.get("/UserLogout", AuthVerification, UserController.UserLogout);
router.post(
  "/CompleteRegistration",
  AuthVerification,
  UserController.CompleteRegistration
);
router.post(
  "/CreateProfile",
  AuthVerification,
  (req, res, next) => {
    req.dynamicFolder = "avatars";
    next();
  },
  upload.single("avatar"),
  UserController.CreateProfile
);
router.get("/ReadProfile", AuthVerification, UserController.ReadProfile);

// email template
router.post("/createTemplate", EmailController.createTemplate);
router.get("/getAllTemplates", EmailController.getAllTemplates);
router.get("/getTemplateById/:id", EmailController.getTemplateById);
router.put("/updateTemplate/:id", EmailController.updateTemplate);
router.delete("/deleteTemplate/:id", EmailController.deleteTemplate);

// Wishlist
router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList);
router.get(
  "/RemoveWishList",
  AuthVerification,
  WishListController.RemoveWishList
);
router.get("/WishList", AuthVerification, WishListController.WishList);

// Cart
router.post(
  "/addToCartController",
  AuthVerification,
  CartController.addToCartController
);
router.put(
  "/updateCartItemController",
  AuthVerification,
  CartController.updateCartItemController
);
router.get(
  "/getCartController",
  AuthVerification,
  CartController.getCartController
);
router.delete(
  "/removeCartItemController",
  AuthVerification,
  CartController.removeCartItemController
);

// Order
router.get("/CreateOrder", AuthVerification, OrderController.CreateOrder);
router.get(
  "/orders",
  AuthVerification,
  CheckRole(["admin", "manager", "customer", "supplier", "staff"]),
  OrderController.getOrdersByRoleController
);

// payment setting
router.post(
  "/PaymentSettingCreate",
  AuthVerification,
  OrderController.PaymentSettingCreate
);

router.post("/payment/success/:tran_id", OrderController.PaymentSuccess);
// router.post("/payment/success/:tran_id", );
// router.post("/payment/fail/:tran_id", OrderController.PaymentFail);

module.exports = router;
