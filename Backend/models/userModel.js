const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     username: {
          type: String,
          required: [true,"Pleace add a username"]
     },
     email: {
          type: String,
          required: [true,"Pleace add a email address"],
          unique: [true,"Email already exists"]
     },
     password: {
          type: String,
          required: [true,"Pleace add a password"]
     },
    },{
         timestamps: true
    });

    module.exports = mongoose.model('User', userSchema)