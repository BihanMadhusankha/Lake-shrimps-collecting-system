const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose'); // Assuming Mongoose for MongoDB


//@desc Register a user 
//@route POST /SSABS/user/signup/
//@access public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { firstname,
            lastname,
            role,
            email,
            phone,
            nic,
            password,
            cpassword,
        } = req.body;

        if (!firstname || !lastname || !role || !email || !phone || !nic ||  !password || !cpassword) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedCPassword = await bcrypt.hash(cpassword, 10);

        const user = await User.create({
            firstname,
            lastname,
            role,
            email,
            phone,
            nic,
            password: hashedPassword,
            cpassword: hashedCPassword,
        })
        
        if (user) {
            res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                user: {
                    firstname: user.firstname,
                    email: user.email,
                    id: user.id
                },
            })
        }
    }
    catch {
        res.status(400);
        throw new Error("User data is not valid");
    }


});

//@desc login a user 
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res,next) => {
    try{
        
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    //compair password 
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = JWT.sign({ 
            user: {
                firstname: user.firstname,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' });
        
        res.status(200).json({
            status: 'success',
            message: 'Loged in successfully',
            accessToken,
            user: {
            
                firstname: user.firstname,
                email: user.email,
                _id: user.id,
                role: user.role,
                
            }
        });
    }
    else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
    }
    catch{
        next(error);
    }
})

const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password'); // Exclude password from response
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      console.log(req.user._id)
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  const logout = asyncHandler(async (req, res) => {
      // res.clearCookie('accessToken');
      res.json({message: 'User logged out successfully'})
  });
  
  
  module.exports = {
      loginUser: loginUser,
      registerUser: registerUser,
      logout: logout,
      getUserProfile: getUserProfile
     
  }

  
  
  
 