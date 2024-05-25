const mongoose = require('mongoose');

const vehicleOwnerSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    nic: String,
    phone: String,
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
  });

  const VehicleOwner = mongoose.model('VehicleOwner', vehicleOwnerSchema);


  module.exports = VehicleOwner;
