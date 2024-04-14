const express = require('express');
const router = express.Router();
const {getCustomer, createCustomer, getCustomers, updateCustomers, deleteCustomers} = require('../contollers/customerController');
const validateToken = require('../midleware/validationTokenHandler');

router.use(validateToken);
router.route('/').get(getCustomer).post(createCustomer);
router.route('/:id').get(getCustomers).put(updateCustomers).delete(deleteCustomers);


module.exports = router;
