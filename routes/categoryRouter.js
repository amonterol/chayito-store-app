const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../utils/auth");
const authAdmin = require("../utils/authAdmin");

router
  .route("/category")
  .get(categoryController.getCategories)
  .post(auth, authAdmin, categoryController.createCategory); //Solo el usuario administrador puede crear categorias

router
  .route("/category/:id")
  .delete(auth, authAdmin, categoryController.deleteCategory)
  .put(auth, authAdmin, categoryController.updateCategory);

module.exports = router;
