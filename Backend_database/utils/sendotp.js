const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


async function sendOtpEmail(toEmail, otp) {
  await transporter.sendMail({
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto;">
        <h2>Verify your email</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 6px;">${otp}</h1>
        <p>This code expires in 10 minutes. If you didn't request it, ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { generateOtp, sendOtpEmail };