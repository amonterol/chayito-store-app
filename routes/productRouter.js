const router = require("express").Router();
const productController = require("../controllers/productController");
const auth = require("../utils/auth");
const authAdmin = require("../utils/authAdmin");

router
  .route("/products")
  .get(productController.getProducts)
  .post(auth, authAdmin, productController.createProduct);

router
  .route("/products/:id")
  .delete(auth, authAdmin, productController.deleteProduct)
  .put(auth, authAdmin, productController.updateProduct);

router.route("/product").get(productController.getCartProduct);

router
  .route("/featured_women_products")
  .get(productController.addWomenFeaturedProduct);
router
  .route("/featured_men_products")
  .get(productController.addMenFeaturedProduct);

router.route("/products/women").get(productController.getWomenProducts);
router.route("/products/men").get(productController.getMenProducts);
router.route("/products/fabrics").get(productController.getFabricProducts);
router.route("/products/boy").get(productController.getBoyProducts);
router.route("/products/girl").get(productController.getGirlProducts);
router
  .route("/products/accessories")
  .get(productController.getAccesoriesProducts);
router.route("/products/school").get(productController.getSchoolProducts);

module.exports = router;
