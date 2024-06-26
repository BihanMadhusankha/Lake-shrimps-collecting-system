const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const mongoose = require('mongoose'); 


const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
  };
  
  
  const updateUserProfile = async (req, res) => {
    try {
      const { firstname, lastname, email, phone } = req.body;
      const userId = req.user.id;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, { firstname, lastname, email, phone }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
  };

  module.exports = {
    updateUserProfile: updateUserProfile,
    getUser: getUser
  }