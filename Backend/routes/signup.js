const express = require('express');
const { registerUser, loginUser, currentUser } = require('../contollers/userController');
const validateToken = require('../midleware/validationTokenHandler');

const router = express.Router();

 router.post('/signup', registerUser)  // Route for user registration
router.post('/login',loginUser); // Route for user login
router.get('/current', validateToken, currentUser); // Route to get current user info


// router.post('/logout', (req, res) => {
//   res.json({
//     message: 'Logout the user'
//   });
// });

module.exports = router;