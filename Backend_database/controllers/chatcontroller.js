const chatData = require('../models/chatmodel');
exports.createchatdata = async(req,res,next)=>{
    const{sessionId,message,reply,fileName} = req.body;
    const chatdata = new chatData({sessionId,message,reply,fileName});
    await chatdata.save();
    res.status(201).json(chatdata);
}
exports.getchatdata = async(req,res,next)=>{
    const {sessionId}= req.params;
    console.log("sessionId received:", sessionId) 
    const chats = await(chatData.find({sessionId}));
    console.log("chats found:", chats)  
    res.status(200).json({ success: true, chats });
}