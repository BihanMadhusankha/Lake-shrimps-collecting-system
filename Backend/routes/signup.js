const express = require('express');
const { registerUser, loginUser, getUserProfile,
        SellersPages,VehicalOwnerPage ,
        updateUsers,displayUser} = require('../contollers/userController');
// const validateToken = require('../midleware/validationTokenHandler');
const upload = require('../models/multer'); // Assuming upload is imported


const router = express.Router();

router.post('/signup', registerUser) 
router.post('/login',loginUser);
router.get('/userhome',getUserProfile);
router.get('/userhome/selerPage',SellersPages );
router.get('/userhome/vehicaleowner',VehicalOwnerPage );
router.put('/userhome/profile',upload.single('profilePicture'),updateUsers);
router.get('/userhome/profile/:id',displayUser);

module.exports = router;
