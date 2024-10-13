const express = require("express");
const registerUser = require("../controllers/authControllers/registerControllers");
const loginUser = require("./../controllers/authControllers/loginUserController");
const forgotPassword = require("./../controllers/authControllers/forgotPasswordController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forget-password", forgotPassword);
module.exports = router;
