// Vehicle.js (model)
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  contactNumber: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  licensePlate: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String
  },
  photo: {
    type: String,
    required: true
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true
     }

});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
