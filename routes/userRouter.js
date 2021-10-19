const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);

router.get("/refresh_token", userController.refreshToken);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

/* 
const auth = require("../middleware/auth");





router.get("/infor", auth, userController.getUser);

router.patch('/addcart', auth, userCtrl.addCart)

router.get('/history', auth, userCtrl.history) */

module.exports = router;
