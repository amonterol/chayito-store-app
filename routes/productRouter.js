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

module.exports = router;
