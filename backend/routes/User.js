const express = require('express');
const router = express.Router();

const {login , signUp , sendOTP , updateProfile} = require("../controllers/Auth")

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendOTP", sendOTP);
router.post("/updateProfile", updateProfile);






module.exports = router;
