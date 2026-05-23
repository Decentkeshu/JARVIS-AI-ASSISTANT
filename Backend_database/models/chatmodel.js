const mongoose = require("mongoose");
const { isNumberObject } = require("util/types");
const chatSchema = mongoose.Schema({
    sessionId: {
      type: String,
      required: true,
      index: true,          
    },
    message: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,      
  });
module.exports = mongoose.model("chatData",chatSchema);