const express = require('express');
const chatrouter = express.Router();
const {createchatdata,getchatdata} = require('../controllers/chatcontroller');
chatrouter.post("/",createchatdata);
chatrouter.get("/:sessionId",getchatdata);
module.exports = chatrouter;