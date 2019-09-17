const express = require("express");
const router = express.Router();

// GET
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Order was fetched"
  });
});

// POST to create order
router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: "created order",
    createdOrder: order
  });
});

// GET specific order with id
router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "order details",
    orderId: orderId
  });
});

// DELETE
router.delete("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: "order delete",
    orderId: orderId
  });
});

module.exports = router;
