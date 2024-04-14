const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,"Pleace add a username"]
    },
    name: {
        type: String,
        required: [true,"Pleace enter your name"]
    },
    email: {
        type: String,
        required: [true,"Pleace enter your email"],
        unique: true
    },
    phone: {
        type: String,
        required: [true,"Pleace enter your phone number"],
        unique: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Customer",customerSchema);