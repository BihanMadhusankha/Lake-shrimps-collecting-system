const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
// const Product = require('../models/Products')
// const Vehicle = require('../models/vehicleSchema');
// const cloudinary = require('cloudinary').v2;
// const Booking = require('../models/bookingSchema');
// const Request = require('../models/Request');
// const Message = require('../models/messageSchema');
// const Receipt = require('../models/uploadRecipt');
// const Course = require('../models/courseSchema');


const ForgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: 'error', error: 'Email is required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ status: 'error', error: 'Email not found' });
    }

    const token = generateResetToken(email);
    // If email exists, send a password reset email
    const mailOptions = {
        from: process.env.MY_GMAIL,
        to: email,
        subject: 'Password Reset',
        text: `Please click the link below to reset your password: \n\n${process.env.CLIENT_URL}/resetPassword?token=${token}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ status: 'success', message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'error', error: 'Failed to send password reset email' });
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD
    }
});

const ResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const email = decoded.email;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ status: 'success', message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ status: 'error', error: 'Failed to reset password' });
    }
};
const generateResetToken = (email) => {
    return JWT.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};


module.exports = {
    ForgetPassword: ForgetPassword
    , ResetPassword: ResetPassword
}