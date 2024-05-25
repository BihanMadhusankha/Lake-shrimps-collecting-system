const express = require('express');
const {adminGetUsers,deleteUsers} = require('../contollers/userController');
// const validateToken = require('../midleware/validationTokenHandler');

const router = express.Router();

router.get('/dashboard',adminGetUsers );

router.delete('/dashboard/:id',deleteUsers );	

module.exports = router;