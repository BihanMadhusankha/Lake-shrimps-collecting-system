const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose'); 
const nodemailer = require('nodemailer');
const Product = require('../models/Products')
const Vehicle = require('../models/vehicleSchema');
const cloudinary = require('cloudinary').v2;
const Booking = require('../models/bookingSchema');
const Request = require('../models/Request');
const Message = require('../models/messageSchema');
const Receipt = require('../models/uploadRecipt');
const Course = require('../models/courseSchema');

const getRegisteredVehicles = async (req, res) => {
    try {
      const vehicles = await Vehicle.find({ owner: req.user.id });
      res.json(vehicles);
      console.log(vehicles);
    } catch (error) {
      console.error('Error fetching registered vehicles:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  const deleteVehicle = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedVehicle = await Vehicle.findOneAndDelete({ _id: id });
      if (!deletedVehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  const UpdateVehicaledata = async (req, res) => {
    const id = req.params.id;
    const updatedVehicleData = req.body;
  
    try {
      const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updatedVehicleData, { new: true });
  
      if (!updatedVehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
  
      res.json(updatedVehicle);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const vehicale_owners_vehicle = async (req, res) => {
    try {
      const ownerId = req.params.ownerId;
      console.log(ownerId);
      const ownerVehicles = await Vehicle.find({ owner: ownerId }); // Use Mongoose to find vehicles by ownerId
      console.log(ownerVehicles)
      res.json({ data: ownerVehicles });
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const registerVehicle = async (req, res) => {
    try {
      const file = req.file;
      const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
        folder: 'vehicle_photos'
      });
  
      const vehicleData = {
        ...req.body,
        photo: cloudinaryResponse.secure_url,
        owner: req.user.id 
      };
  
      const vehicle = new Vehicle(vehicleData);
      await vehicle.save();
  
      res.status(201).json({ message: 'Vehicle registered successfully', vehicle });
    } catch (error) {
      console.error('Error registering vehicle:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  module.exports = {
    getRegisteredVehicles: getRegisteredVehicles,
    deleteVehicle: deleteVehicle,  
    UpdateVehicaledata: UpdateVehicaledata,
    vehicale_owners_vehicle: vehicale_owners_vehicle,
    registerVehicle: registerVehicle,
    

  }