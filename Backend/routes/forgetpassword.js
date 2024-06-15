const express = require('express');
const validateToken = require('../midleware/validationTokenHandler');

const {ForgetPassword,ResetPassword} = require('../contollers/forgetpasswordController');


const router = express.Router();

router.post('/userforget',ForgetPassword);
router.post('/resetPassword',ResetPassword);









module.exports = router;