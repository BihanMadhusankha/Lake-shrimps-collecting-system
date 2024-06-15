const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    vehicleId: String,
    name: String,
    date: String,
    status: { type: String, default: 'pending' } // 'pending', 'accepted', 'cancelled'
  });

  const Booking = mongoose.model('Booking', bookingSchema);

  module.exports = Booking;
