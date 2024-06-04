const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose'); // Assuming Mongoose for MongoDB
const nodemailer = require('nodemailer');
const Product = require('../models/Products')
const Vehicle = require('../models/vehicleSchema');
const cloudinary = require('cloudinary').v2;
const Booking = require('../models/bookingSchema');
const VehicalOwner = require('../models/vehicleOwnerSchema')
const Request = require('../models/Request');
const Message = require('../models/messageSchema');
const Receipt = require('../models/uploadRecipt');
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
const InstructerPage = async (req, res) => {
  try {
    const instructer = await User.find({ role: 'content_creater' });
    res.json({ data: instructer });
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
  const userId = req.user.id; 
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
    const userId = req.user.id; 
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

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
      const { name, price,totalHarvest, description } = req.body;
  
      const createdAt = new Date();

      // Create a new product object
      const newProduct = new Product({
        name,
        price,
        totalHarvest,
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
        const { name, price,totalHarvest, description } = req.body;
    
        const product = await Product.findOneAndUpdate(
          { _id: id, sellerId },
          { name, price,totalHarvest, description },
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
    console.log(ownerId);
    const ownerVehicles = await Vehicle.find({ owner: ownerId }); // Use Mongoose to find vehicles by ownerId
    console.log(ownerVehicles)
    res.json({ data: ownerVehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

const PostRequest = async (req, res) => {
  const { productId, address, city, deliveryOption, quantity, totalAmount, sellerId, userId } = req.body;
  console.log(`User ${userId} is requesting product ${productId}`);

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newRequest = new Request({
      productId,
      address,
      city,
      deliveryOption,
      quantity,
      totalAmount,
      sellerId,
      userId,  // Include userId in the new request
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getRequestHistory =  async (req, res) => {
  const sellerId = req.user.id; // Assuming user ID is available in req.user
  try {
    const requests = await Request.find({ sellerId: sellerId });
    res.json(requests);
  } catch (error) {
    res.status(500).send('Server Error');
  }
}

const requestAccept = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const userId = req.params.userId;
    const sellerId = req.params.sellerId;
    
      
      const request = await Request.findById(requestId);
      if (!request) {
          return res.status(404).json({ message: 'Request not found' });
      }

      request.status = 'Accepted';
      request.userId = userId; 
      request.sellerId = sellerId; 
      await request.save();

      // Send a message to the user
      const message = new Message({
          userId: userId,
          sellerId: sellerId,
          message: 'Your request has been accepted!',
      });

      await message.save();

      res.json({ message: 'Request accepted and message sent to user' });
  } catch (error) {
      console.error('Error accepting request:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};





const DeleteRequest =async (req, res) => {
  try {
    const requestId = req.params.requestId;

    await Request.findByIdAndDelete(requestId);

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




const viewMessage = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`User ${userId} is viewing their messages`);
    const messages = await Message.find({ userId }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteMessage = async (req, res) => {
  try {
    const message = req.params.messageId
    if (!message) return res.status(404).json({ message: 'Message not found' });

    // Check if the user is authorized to delete the message
    // Add your authorization logic here...

    await Message.findByIdAndDelete(message); // Use remove() method to delete the document
    res.json({ message: 'Message deleted successfully' });
} catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Internal Server Error' });
}
}
const getAcceptRequest = async (req, res) => {
  try {
    const userId = req.user._id;

    const acceptedRequests = await Accepted.find({ userId: userId, status: 'Accepted' })
      .populate('productId')
      .populate('sellerId');

    res.status(200).json(acceptedRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accepted requests', error });
  }
}

const uploadPaymentReceipt = async (req, res) => {
  try {
      const file = req.file;
      const { sellerId } = req.body;
      console.log(sellerId); // Debug log to check if sellerId is received

      if (!file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }

      if (!sellerId) {
          return res.status(400).json({ message: 'sellerId is required' });
      }

      const result = await cloudinary.uploader.upload(file.path, {
          folder: 'payment_receipts',
      });

      const newRicipt = new Receipt({
          sellerId: sellerId,
          message: 'Payment receipt uploaded',
          photoUrl: result.secure_url,
      });

      await newRicipt.save();

      res.status(201).json({ message: 'Payment receipt uploaded successfully', imageUrl: result.secure_url });
  } catch (error) {
      console.error('Error uploading payment receipt:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const getUploadPhoto = async (req, res) => {
  try {
    const sellerId = req.user.id; // Assuming req.user contains authenticated seller info
    const receipts = await Receipt.find({ sellerId });

    if (!receipts) {
      return res.status(404).json({ message: 'No payment receipts found' });
    }

    res.json(receipts);
  } catch (error) {
    console.error('Error fetching payment receipts:', error);
    res.status(500).json({ message: 'Server error' });
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
    InstructerPage:InstructerPage,
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
    registerVehicle :registerVehicle,
    getRegisteredVehicles:getRegisteredVehicles,
    UpdateVehicaledata:UpdateVehicaledata,
    deleteVehicle:deleteVehicle,
    vehicale_owners_vehicle:vehicale_owners_vehicle,
    booking:booking,
    PostRequest:PostRequest,
    getRequestHistory:getRequestHistory,
    requestAccept:requestAccept,
    DeleteRequest:DeleteRequest,
    getAcceptRequest:getAcceptRequest,
    viewMessage:viewMessage,
    deleteMessage:deleteMessage,
    uploadPaymentReceipt:uploadPaymentReceipt,
    getUploadPhoto:getUploadPhoto
  }




