const express = require('express');
const {getUsers,deleteUsers} = require('../contollers/userController');
// const validateToken = require('../midleware/validationTokenHandler');

const router = express.Router();

router.get('/dashboard',getUsers );

router.delete('/dashboard/:id',deleteUsers );	

module.exports = router;