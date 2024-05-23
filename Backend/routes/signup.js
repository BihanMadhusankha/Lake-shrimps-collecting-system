const express = require('express');
const { registerUser, loginUser, getUserProfile,
        SellersPages,VehicalOwnerPage ,
        updateUser,getUser,ForgetPassword,
        ResetPassword    } = require('../contollers/userController');
const validateToken = require('../midleware/validationTokenHandler');
const upload = require('../models/multer'); // Assuming upload is imported

const router = express.Router();

router.post('/signup', registerUser) 
router.post('/login',loginUser);
router.get('/userhome',validateToken,getUserProfile);
router.get('/userhome/selerPage',SellersPages );
router.get('/userhome/vehicaleowner',VehicalOwnerPage );
router.get('/userhome/profile/:id', getUser);
router.put('/userhome/profile/:id', upload.single('profilePicture'), updateUser);
router.post('/forgetpassword',ForgetPassword);
router.post('/resetPassword',ResetPassword);


module.exports = router;
