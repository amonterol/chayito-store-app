const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../utils/auth");
const authAdmin = require("../utils/authAdmin");

router
  .route("/payment")
  .get(auth, authAdmin, paymentController.getPayments)
  .post(auth, paymentController.createPayment);

module.exports = router;
