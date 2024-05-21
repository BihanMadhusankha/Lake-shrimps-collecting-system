const mongoose = require('mongoose');
const multer = require('multer'); // for file upload

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
        enum: ['admin', 'user','seler','vehicale_owner','content_creater'], 
        required: [true, "Please add a Role"]
    },
    email: {
        type: String,
        required: [true, "Please add unique Email"],
        unique: [true, "Email already exists"]
    },
    phone: {
        type: String,
        required: [true, "Please add unique Phone Number"]
    },
    nic: {
        type: String,
        required: [true, "Please add unique NIC"]
    },
    password: {
        type: String,
        required: [true, "Please add Password"]
    },
    cpassword:{
        type: String,
        required: [true, "Please add Confirm Password"]
    },
    profilePicture: {
        type: String,
      },
   
}, {
    timestamps: true
});



module.exports = mongoose.model('User', userSchema);
