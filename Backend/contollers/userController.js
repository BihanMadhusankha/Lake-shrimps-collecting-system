const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose'); // Assuming Mongoose for MongoDB
const nodemailer = require('nodemailer');
const Product = require('../models/Products')
const CartItem = require('../models/cartItemSchema');
const Vehicle = require('../models/vehicleSchema');
const cloudinary = require('cloudinary').v2;
const Booking = require('../models/bookingSchema');
const VehicalOwner = require('../models/vehicleOwnerSchema')

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
        { expiresIn: '1h' });

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


const adminGetUsers = async (req, res) => {
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

const getUser = async (req, res) => {
  const userId = req.user.id; // Assuming you have middleware that adds the user object to the request

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};


const updateUserProfile = async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;
    const userId = req.user.id; // Assuming the user ID is stored in req.user.id after authentication

    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Find the user by ID and update the profile fields
    const updatedUser = await User.findByIdAndUpdate(userId, { firstname, lastname, email, phone }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
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
  
  const Products = async (req, res) => {
    try {
      // Assuming you're using JWT and the user's ID is stored in the token payload
      const sellerId = req.user.id;
  
      // Assuming the request body contains the product details
      const { name, price, description } = req.body;
  
      const createdAt = new Date();

      // Create a new product object
      const newProduct = new Product({
        name,
        price,
        description,
        sellerId,
        createdAt
      });
  
      // Save the product to the database
      await newProduct.save();
  
      // Respond with a success message
      res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
      // If an error occurs, respond with an error message
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const getProducts = async (req, res) => {
    try {
      const sellerId = req.user.id;
      const products = await Product.find({ sellerId});
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
    const productdelete = async (req, res) => {
      try {
        const { id } = req.params;
        const sellerId = req.user.id;
    
        const product = await Product.findOneAndDelete({ _id: id, sellerId });
        if (!product) {
          return res.status(404).json({ message: 'Product not found or not authorized' });
        }
        res.json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }

    const updateProduct = async (req, res) => {
      try {
        const { id } = req.params;
        const sellerId = req.user.id;
        const { name, price, description } = req.body;
    
        const product = await Product.findOneAndUpdate(
          { _id: id, sellerId },
          { name, price, description },
          { new: true }
        );
    
        if (!product) {
          return res.status(404).json({ message: 'Product not found or not authorized' });
        }
    
        res.json(product);
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

    const productveiw = async (req, res) => {
      try {
        // Get the current time
        const now = new Date();
    
        // Calculate the start time for the last 24 hours
        const startOfLast24Hours = new Date(now);
        startOfLast24Hours.setHours(startOfLast24Hours.getHours() - 24);
    
        // Log the start and end time for debugging
        console.log('Start of Last 24 Hours:', startOfLast24Hours);
        console.log('Now:', now);
    
        // Fetch products created within the last 24 hours
        const products = await Product.find({
          createdAt: {
            $gte: startOfLast24Hours,
            $lt: now
          }
        });
    
        // Log the fetched products
        console.log('Fetched Products:', products);
    
        // Send the response
        res.json(products);
      } catch (err) {
        // Log and send an error response if an error occurs
        console.error('Error fetching products:', err);
        res.status(500).json({ message: err.message });
      }
    };

    const addToCart = async (req, res) => {
      try {
        const { productId ,price} = req.body;
        const userId = req.user.id; // Assuming you have authenticated users
    
        // Create a new cart item
        const cartItem = new CartItem({
          productId,
          userId,
          price,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        });
    
        // Save the cart item to the database
        await cartItem.save();
    
        res.status(200).json({ message: 'Product added to cart successfully' });
      } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
      }
    };
    

    const cartitem = async (req, res) => {
      try {
        const userId = req.user.id;
        // Find all cart items associated with the user ID
        const cartItems = await CartItem.find(
          { userId: userId, quantity: { $gt: 0 } }, { userId });
        console.log(cartItems);
        res.json(cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Failed to fetch cart items' });
      }
    };

    const addcartitemdelete =async (req, res) => {
      const id = req.params.id;
      console.log(id);
  
  
      try {
          const cartItem = await CartItem.findOneAndDelete({ _id: id });
          if (!cartItem) {
              return res.status(404).json({ message: 'Cart item not found' });
          }
          res.json({ message: 'Cart item deleted successfully' });
      } catch (error) {
          console.error('Error during deletion:', error);
          res.status(500).send('An error occurred');
      }
  }

  const registerVehicle = async (req, res) => {
    // Handle file upload to Cloudinary
    try {
      const file = req.file;
      const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
        folder: 'vehicle_photos'
      });
  
      // Save vehicle data to database
      const vehicleData = {
        ...req.body,
        photo: cloudinaryResponse.secure_url,
        owner: req.user.id // Assuming you have authentication middleware that attaches the user ID to the request object
      };
  
      const vehicle = new Vehicle(vehicleData);
      await vehicle.save();
  
      res.status(201).json({ message: 'Vehicle registered successfully', vehicle });
    } catch (error) {
      console.error('Error registering vehicle:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const getRegisteredVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.user.id });
    res.json(vehicles);
    console.log(vehicles);
  } catch (error) {
    console.error('Error fetching registered vehicles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const UpdateVehicaledata =async (req, res) => {
  const id = req.params.id;
  const updatedVehicleData = req.body;

  try {
    // Find the vehicle by ID and update it
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updatedVehicleData, { new: true });

    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json(updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteVehicle =async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVehicle = await Vehicle.findOneAndDelete({ _id: id });
    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const vehicale_owners_vehicle = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const vehicles = await Vehicle.find({ ownerId }); // Assuming ownerId is the field in the Vehicle model that represents the owner's ID
    res.json({ success: true, data: vehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const booking =async (req, res) => {
  const { vehicleId, name, date } = req.body;

  const newBooking = new Booking({ vehicleId, name, date });

  try {
    const savedBooking = await newBooking.save();

    res.status(200).json({ message: 'Booking successful', bookingId: savedBooking._id });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error });
  }
}


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
    adminGetUsers: adminGetUsers,
    deleteUsers: deleteUsers,
    updateUserProfile: updateUserProfile,
    getUser: getUser,
    ForgetPassword: ForgetPassword,
    ResetPassword: ResetPassword,
    Products: Products,
    getProducts:getProducts,
    productdelete: productdelete,
    updateProduct:updateProduct,
    productveiw:productveiw,
    addToCart:addToCart,
    cartitem:cartitem,
    addcartitemdelete:addcartitemdelete,
    registerVehicle :registerVehicle,
    getRegisteredVehicles:getRegisteredVehicles,
    UpdateVehicaledata:UpdateVehicaledata,
    deleteVehicle:deleteVehicle,
    vehicale_owners_vehicle:vehicale_owners_vehicle,
    booking:booking
  }




