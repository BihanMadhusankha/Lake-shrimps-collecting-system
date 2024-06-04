const mongoose = require('mongoose');

const uploadhotoschema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  photoUrl: { type: String },
  createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Receipt', uploadhotoschema);
