const express = require('express');
const { registerUser, loginUser} = require('../contollers/userController');
const validateToken = require('../midleware/validationTokenHandler');

const router = express.Router();

router.post('/signup', registerUser)  // Route for user registration
router.post('/login',loginUser);

module.exports = router; 