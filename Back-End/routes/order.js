const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product")

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus, deleteOrder } = require("../controllers/order");
const { Order } = require("../models/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//create
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)


//read
router.get("order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

//status of order
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put("order/:orderId/status/:userId", isSignedIn, isAuthenticated,isAdmin, updateStatus)

//listing page routes
router.get("/order", getAllOrders)

//delete routes
router.delete("/order/:orderId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteOrder)

module.exports = router;