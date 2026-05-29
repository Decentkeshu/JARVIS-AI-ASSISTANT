const express = require('express');
const chatrouter = express.Router();
const { createchatdata, getchatdata, getsessions, deletesession } = require('../controllers/chatcontroller');

chatrouter.post("/", createchatdata);
chatrouter.get("/sessions/:userId", getsessions);      
chatrouter.delete("/session/:sessionId", deletesession); 
chatrouter.get("/:sessionId", getchatdata);             

module.exports = chatrouter;