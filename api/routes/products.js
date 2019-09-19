const express = require("express");
const router = express.Router();

// import middleware for protect
const Auth = require("../middleware/auth");

// package to add file image
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// import product from controller
const productControll = require("../controller/product-control");

router.get("/", productControll.get_product);

router.post(
  "/",
  Auth,
  upload.single("productImage"),
  productControll.create_product
);

router.get("/:productId", Auth, productControll.get_product_id);

router.patch("/:productId", Auth, productControll.update_product);

router.delete("/:productId", Auth, productControll.delete_product);

module.exports = router;
