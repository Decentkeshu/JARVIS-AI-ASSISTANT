const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    userId: {
        type: String,
        required: false, 
        index: true,
    },
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
}, {
    timestamps: true,
});

module.exports = mongoose.model("chatData", chatSchema);