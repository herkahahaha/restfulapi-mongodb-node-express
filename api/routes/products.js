const express = require("express");
const router = express.Router();

// GET
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /products"
  });
});

// POST
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling POST request to /products"
  });
});

// GET specific data with id
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "you discovered special id"
    });
  } else {
    res.status().json({
      message: "you passed on ID"
    });
  }
});

// PATCH to update data same on PUT
router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "update product"
  });
});

// DELETE
router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "delete product"
  });
});

module.exports = router;
