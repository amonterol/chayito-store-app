const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../utils/auth");

router.post("/register", userController.register);

router.get("/refresh_token", userController.refreshToken);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.get("/infor", auth, userController.getUser);
router.patch("/addcart", auth, userController.addCart);

router.get("/history", auth, userController.history);

module.exports = router;
