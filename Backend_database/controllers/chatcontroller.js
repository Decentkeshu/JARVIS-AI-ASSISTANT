const chatData = require('../models/chatmodel');
const User = require('../models/usermodel');
const { check, validationResult } = require('express-validator');

exports.createchatdata = async(req, res, next) => {
    const { sessionId, message, reply, fileName } = req.body;
    const chatdata = new chatData({ sessionId, message, reply, fileName });
    await chatdata.save();
    res.status(201).json(chatdata);
}

exports.getchatdata = async(req, res, next) => {
    const { sessionId } = req.params;
    const chats = await chatData.find({ sessionId });
    res.status(200).json({ success: true, chats });
}


exports.userlogged = [
    check('user')
        .notEmpty().withMessage('User name is required')
        .trim()
        .isLength({ min: 2 }).withMessage('User name must be at least 2 characters'),

    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email'),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    check('cpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),

    async(req, res, next) => {
        console.log("backend hit, req.body:", req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { user, email, password, cpassword } = req.body;
        const users = new User({ user, email, password, cpassword });
        await users.save();
        res.status(200).json(users);
    }
];

exports.loggeduser = async(req, res, next) => {
    const { identifier, password } = req.body; 

   
    const users = await User.findOne({
        $or: [{ user: identifier }, { email: identifier }],
        password: password
    });

    if (!users) return res.status(401).json({ message: "User not found." });
    res.status(200).json(users);
}