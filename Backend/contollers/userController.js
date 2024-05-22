const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose'); // Assuming Mongoose for MongoDB
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

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

    if (!firstname || !lastname || !role || !email || !phone || !nic || !password || !cpassword) {
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
const loginUser = asyncHandler(async (req, res, next) => {
  try {

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
  catch {
    next(error);
  }
})

const getUserProfile = async (req, res) => {
  // Access protected user data or perform actions (replace with your logic)
  console.log('User accessed protected resource:', req.user); // User data from decoded token
  res.json({ message: 'Welcome, authorized user!' });
}

const SellersPages = async (req, res) => {
  try {
    const sellers = await User.find({ role: 'seler' });
    res.json({ data: sellers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching sellers');
  }
}

const VehicalOwnerPage = async (req, res) => {
  try {
    const owners = await User.find({ role: 'vehicale_owner' });
    res.json({ data: owners });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Vehicale Owner');
  }
}


const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Find all users in the collection
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to load user data.' });
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the filename
  },
});

const upload = multer({ storage });

const getUser = async (req, res) => {
  const { id } = req.params;
console.log(id)
  // Check if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error); // Log the full error
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, nic } = req.body;
    const updateData = { firstname, lastname,email, phone, nic };

    if (req.file) {
      updateData.profilePicture = req.file.path; // Update profile picture path
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }); // Return updated user

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).send('Internal server error');
  }
};


const ForgetPassword = async (req, res) => {
  const { email } = req.body;

    if (!email) {
      return res.status(400).json({ status: 'error', error: 'Email is required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'Email not found' });
    }

    const token = generateResetToken(email);
    // If email exists, send a password reset email
    const mailOptions = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: 'Password Reset',
      text: `Please click the link below to reset your password: \n\n${process.env.CLIENT_URL}/resetPassword?token=${token}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ status: 'success', message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ status: 'error', error: 'Failed to send password reset email' });
    }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_GMAIL,
      pass: process.env.MY_PASSWORD
    }
  });

  const ResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const email = decoded.email;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ status: 'error', error: 'User not found' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.json({ status: 'success', message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ status: 'error', error: 'Failed to reset password' });
    }
  };
  const generateResetToken = (email) => {
    return JWT.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  };
  
  
  const logout = asyncHandler(async (req, res) => {
    // res.clearCookie('accessToken');
    res.json({ message: 'User logged out successfully' })
  });


  module.exports = {
    loginUser: loginUser,
    registerUser: registerUser,
    logout: logout,
    getUserProfile: getUserProfile,
    SellersPages: SellersPages,
    VehicalOwnerPage: VehicalOwnerPage,
    getUsers: getUsers,
    deleteUsers: deleteUsers,
    updateUser: updateUser,
    getUser: getUser,
    ForgetPassword: ForgetPassword,
    ResetPassword: ResetPassword
  }




