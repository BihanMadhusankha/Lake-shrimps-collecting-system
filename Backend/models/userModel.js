const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please add a First Name"]
    },
    lastname: {
        type: String,
        required: [true, "Please add a Last Name"]
    },
    role: {
        type: String,
        required: [true, "Please add a Role"]
    },
    email: {
        type: String,
        required: [true, "Please add unique Email"],
        unique: [true, "Email already exists"]
    },
    birthday: {
        type: Date,
        required: [true, "Please add Birthday"]
    },
    gender: {
        type: String,
        required: [true, "Please add Gender"]
    },
    phone: {
        type: String,
        required: [true, "Please add unique Phone Number"]
    },
    nic: {
        type: String,
        required: [true, "Please add unique NIC"]
    },
    state: {
        type: String,
        required: [true, "Please add unique State"]
    },
    password: {
        type: String,
        required: [true, "Please add Password"]
    },
    cpassword:{
        type: String,
        required: [true, "Please add Confirm Password"]}
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
