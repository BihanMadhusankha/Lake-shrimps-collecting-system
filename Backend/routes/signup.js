const express = require('express');
const { registerUser, loginUser, currentUser } = require('../contollers/userController');
const validateToken = require('../midleware/validationTokenHandler');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current',validateToken ,currentUser);

// router.post('/logout', (req, res) => {
//   res.json({
//     message: 'Logout the user'
//   });
// });

module.exports = router;