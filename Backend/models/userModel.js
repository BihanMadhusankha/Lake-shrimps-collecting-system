const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     firstname: {
          type: String,
          required: true,
          unique: [true,"Pleace add first name"],
 
      },
      lastname: {
          type: String,
          required: true,
          unique: [true,"Pleace add last name"],

      },
      role: {
          type: String,
          required: true,
          unique: [true,"Pleace select your role"],

      },
      email: {
          type: String,
          required: true,
          unique: [true,"Pleace add unique email"],

      },
      birthday: {
          type: Date,
          required: true,
          unique: [true,"Pleace add birthday"]

      },
      gender: {
          type: String,
          required: true,
          unique: [true,"Pleace select gender"],

      },
      phone: {
          type: String,
          required: true,
          unique: [true,"Pleace add phone number"],

      },
      nic: {
          type: String,
          required: true,
          unique: [true,"Pleace add nic"],

      },
      state: {
          type: String,
          required: true,
          unique: [true,"Pleace select state"],

      },
      password: {
          type: String,
          required: true,
          unique: [true,"Pleace add unique password"],

      },
      confirmPassword: {
          type: String,
          required: true,
          unique: [true,"Pleace checking password"],

      }
    },{
         timestamps: true
    });

    module.exports = mongoose.model('User', userSchema)