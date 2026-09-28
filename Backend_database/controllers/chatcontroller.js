const chatData = require('../models/chatmodel');
const User = require('../models/usermodel');
const { check, validationResult } = require('express-validator');
const { generateOtp, sendOtpEmail } = require('../utils/sendotp');

const OTP_LIFETIME = 10 * 60 * 1000; 


exports.createchatdata = async (req, res, next) => {
    const { sessionId, message, reply, fileName, userId } = req.body;
    const chatdata = new chatData({ sessionId, message, reply, fileName, userId });
    await chatdata.save();
    res.status(201).json(chatdata);
};

exports.getchatdata = async (req, res, next) => {
    const { sessionId } = req.params;
    const chats = await chatData.find({ sessionId }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, chats });
};

exports.getsessions = async (req, res, next) => {
    const { userId } = req.params;
    const sessions = await chatData.aggregate([
        { $match: { userId } },
        { $sort: { createdAt: -1 } },
        { $group: {
            _id: "$sessionId",
            lastMessage: { $first: "$message" },
            createdAt: { $first: "$createdAt" }
        }}
    ]);
    res.status(200).json({ success: true, sessions });
};

exports.deletesession = async (req, res, next) => {
    const { sessionId } = req.params;
    await chatData.deleteMany({ sessionId });
    res.status(200).json({ success: true });
};


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

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const { user, email, password, cpassword } = req.body;

            const existing = await User.findOne({ email });

    
            if (existing && existing.isVerified !== false) {
                return res.status(409).json({ message: "Email already registered." });
            }

            const otp = generateOtp();
            const otpExpires = Date.now() + OTP_LIFETIME;

            if (existing) {
                
                existing.user = user;
                existing.password = password;
                existing.cpassword = cpassword;
                existing.otp = otp;
                existing.otpExpires = otpExpires;
                await existing.save();
            } else {
                await new User({
                    user, email, password, cpassword,
                    otp, otpExpires, isVerified: false
                }).save();
            }

            await sendOtpEmail(email, otp);
            res.status(200).json({ message: "OTP sent to your email.", email });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
];


exports.verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const users = await User.findOne({ email });

        if (!users) return res.status(404).json({ message: "User not found." });
        if (users.isVerified !== false) {
            return res.status(400).json({ message: "Already verified." });
        }
        if (users.otp !== otp || !users.otpExpires || users.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }

        users.isVerified = true;
        users.otp = undefined;
        users.otpExpires = undefined;
        await users.save();

        res.status(200).json({
            message: "Email verified.",
            _id: users._id,
            user: users.user,
            email: users.email
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.resendotp = async (req, res) => {
    try {
        const { email } = req.body;
        const users = await User.findOne({ email });

        if (!users || users.isVerified !== false) {
            return res.status(400).json({ message: "Cannot resend OTP for this email." });
        }

        users.otp = generateOtp();
        users.otpExpires = Date.now() + OTP_LIFETIME;
        await users.save();
        await sendOtpEmail(email, users.otp);

        res.status(200).json({ message: "New OTP sent." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loggeduser = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        const users = await User.findOne({
            $or: [{ user: identifier }, { email: identifier }],
            password: password
        });

        if (!users) return res.status(401).json({ message: "User not found." });
        if (users.isVerified === false) {
            return res.status(403).json({ message: "Please verify your email first." });
        }

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};