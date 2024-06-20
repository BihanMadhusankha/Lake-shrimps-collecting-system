const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose'); 
const nodemailer = require('nodemailer');
const Product = require('../models/Products')
const Vehicle = require('../models/vehicleSchema');
const cloudinary = require('cloudinary').v2;
const Booking = require('../models/bookingSchema');
const Request = require('../models/Request');
const Message = require('../models/messageSchema');
const Receipt = require('../models/uploadRecipt');
const Course = require('../models/courseSchema');

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
  console.log('User accessed protected resource:', req.user); 
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
    const users = await User.find(); 
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




const Products = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { name, price, totalHarvest, description } = req.body;

    const createdAt = new Date();

    const newProduct = new Product({
      name,
      price,
      totalHarvest,
      description,
      sellerId,
      createdAt
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getProducts = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const products = await Product.find({ sellerId });
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
    const { name, price, totalHarvest, description } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, sellerId },
      { name, price, totalHarvest, description },
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

    console.log('Start of Last 24 Hours:', startOfLast24Hours);
    console.log('Now:', now);

    // Fetch products created within the last 24 hours
    const products = await Product.find({
      createdAt: {
        $gte: startOfLast24Hours,
        $lt: now
      }
    });

    console.log('Fetched Products:', products);

    // Send the response
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: err.message });
  }
};

const booking = async (req, res) => {
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
      userId,  
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getRequestHistory = async (req, res) => {
  const sellerId = req.user.id; 
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

const DeleteRequest = async (req, res) => {
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

    

    await Message.findByIdAndDelete(message); 
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
    console.log(sellerId); 

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
    const sellerId = req.user.id; 
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

const allTransactions = async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching receipts', error });
  }
}

const deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting receipt', error });
  }
}
const search =async (req, res) => {
  const { query } = req.query;

  try {
      const instructors = await User.find({
          $or: [
              { firstname: { $regex: query, $options: 'i' } },
              { role: { $regex: query, $options: 'i' } }
          ]
      });

      const products = await Product.find({
          $or: [
              { title: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } }
          ]
      });
      res.json({ instructors, products });
  } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ message: 'Server Error' });
  }
}

const logout = asyncHandler(async (req, res) => {
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
  Products: Products,
  getProducts: getProducts,
  productdelete: productdelete,
  updateProduct: updateProduct,
  productveiw: productveiw,
  booking: booking,
  PostRequest: PostRequest,
  getRequestHistory: getRequestHistory,
  requestAccept: requestAccept,
  DeleteRequest: DeleteRequest,
  getAcceptRequest: getAcceptRequest,
  viewMessage: viewMessage,
  deleteMessage: deleteMessage,
  uploadPaymentReceipt: uploadPaymentReceipt,
  getUploadPhoto: getUploadPhoto,
  allTransactions: allTransactions,
  deleteReceipt: deleteReceipt,
  search:search
  
}




