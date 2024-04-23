const express = require('express');
const { registerUser, loginUser, getProfile,logout } = require('../contollers/userController');
const validateToken = require('../midleware/validationTokenHandler');

const router = express.Router();

 router.post('/signup', registerUser)  // Route for user registration
router.post('/login',loginUser); // Route for user login
router.get('/current', validateToken, getProfile); // Route to get current user info


router.post('/logout', logout);

module.exports = router;