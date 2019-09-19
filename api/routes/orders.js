const express = require("express");
const router = express.Router();

// import controller
const orderController = require("../controller/order-control");

// import middleware to protect data
const Auth = require("../middleware/auth");

// get all data order
router.get("/", Auth, orderController.get_all);

// POST to create order
router.post("/", Auth, orderController.create_order);

// GET specific order with id
router.get("/:orderId", Auth, orderController.get_order_id);

// DELETE
router.delete("/:orderId", Auth, orderController.delete_order);

module.exports = router;
