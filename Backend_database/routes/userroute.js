const express = require('express');
const { userlogged,loggeduser } = require('../controllers/chatcontroller');
const userrouter = express.Router();

userrouter.post("/",userlogged);
userrouter.post("/login",loggeduser);
module.exports = userrouter;