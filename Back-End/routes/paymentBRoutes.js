const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {getUserById} = require("../controllers/user")
const { getToken, processPayment } = require("../controllers/paymentb");
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

router.param("userId", getUserById);

module.exports = router;
