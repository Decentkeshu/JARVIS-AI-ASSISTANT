const express = require('express');
const { userlogged,loggeduser,verifyotp,resendotp} = require('../controllers/chatcontroller');
const userrouter = express.Router();

userrouter.post("/",userlogged);
userrouter.post("/login",loggeduser);
userrouter.post('/verify-otp', verifyotp);
userrouter.post('/resend-otp', resendotp);
module.exports = userrouter;