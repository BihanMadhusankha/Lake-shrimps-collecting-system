const express = require('express');
const validateToken = require('../midleware/validationTokenHandler');
const{getUser,updateUserProfile} = require('../contollers/profileController')

const router = express.Router();

router.get('/',validateToken, getUser);
router.put('/',validateToken, updateUserProfile);

module.exports = router;

