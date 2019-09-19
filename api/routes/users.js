const express = require("express");
const router = express.Router();

const userController = require("../controller/user-control");

// Signup for new users
router.post("/signup", userController.signup);

// Login using auth by jsonwebtoken
router.post("/login", userController.login);

// delete user
router.delete("/:userId", userController.delete_user);

module.exports = router;
