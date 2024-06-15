const express = require('express');
const {adminGetUsers,deleteUsers,allTransactions,deleteReceipt} = require('../contollers/userController');
const validateToken = require('../midleware/validationTokenHandler');

const router = express.Router();

router.get('/dashboard',adminGetUsers );

router.delete('/dashboard/:id',deleteUsers );

router.get('/alltransaction',allTransactions);
router.delete('/receipt/:id',deleteReceipt);

module.exports = router;