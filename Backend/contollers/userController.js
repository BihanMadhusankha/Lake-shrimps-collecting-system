const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

//@desc Register a user 
//@route POST /SSABS/user/signup/
//@access public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { firstname,
            lastname,
            role,
            email,
            birthday,
            gender,
            phone,
            nic,
            state,
            password,
            cpassword,
        } = req.body;

        if (!firstname || !lastname || !role || !email || !birthday || !gender || !phone || !nic || !state || !password || !cpassword) {
           return res.json({
            status: 'error',
            message: 'All fields are mandatory'
           })
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
            birthday,
            gender,
            phone,
            nic,
            state,
            password: hashedPassword,
            cpassword: hashedCPassword,
        })
        const accessToken = JWT.sign({
            user: {
                firstname: user.firstname,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' });
        if (user) {
            res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                accessToken,
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
    if (user) {
        const accessToken = JWT.sign({
          user: {
            firstname: user.firstname,
            email: user.email,
            id: user.id
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' });
  
        // Set cookie with access token (adjust options as needed)
        res.cookie('accessToken', accessToken, {
          httpOnly: true, // Prevent client-side access
          secure: true,   // Use only with HTTPS (if applicable)
          maxAge: 60 * 1000, // Expires in 1 minute (adjust as needed)
        });
  
        res.status(200).json({
          status: 'success',
          message: 'User login successfully',
          accessToken,
          user: {
            firstname: user.firstname,
            email: user.email,
            id: user.id
          },
        });
      }
    } catch {
      res.status(400);
      throw new Error("User data is not valid");
    }
  });

//@desc profile user info
//@route GET 
//@access private
const getProfile = asyncHandler(async (req, res) => {
    try {
      const userId = req.user.id; // Access user ID from decoded JWT
  
      // Replace with your actual logic to fetch user data from the database
      const user = await db.User.findByPk(userId); // Assuming a User model
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ user });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle internal errors
    }
  });

const logout = asyncHandler(async (req, res) => {
    res.clearCookie('accessToken');
    res.json({message: 'User logged out successfully'})
});


module.exports = {
    loginUser: loginUser,
    registerUser: registerUser,
    getProfile: getProfile,
    logout: logout
}