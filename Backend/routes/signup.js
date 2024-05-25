const express = require('express');
const { registerUser, loginUser, getUserProfile,
        SellersPages,VehicalOwnerPage ,
        updateUserProfile,getUser,ForgetPassword,
        ResetPassword,    
        Products,getProducts,productdelete,updateProduct,
        productveiw,
        addToCart,cartitem,addcartitemdelete,registerVehicle,
        getRegisteredVehicles,UpdateVehicaledata,deleteVehicle,
        vehicale_owners_vehicle,
        booking} = require('../contollers/userController');
const validateToken = require('../midleware/validationTokenHandler');
const upload = require('../midleware/uploadMiddleware');

const router = express.Router();

router.post('/user/signup', registerUser) 
router.post('/user/login',loginUser);
router.get('/user/userhome',validateToken,getUserProfile);

router.get('/seler/dashboard',validateToken,getUserProfile);
router.post('/seler/products',validateToken,Products);
router.get('/seler/products',validateToken, getProducts);
router.delete('/seler/products/:id',validateToken, productdelete);
router.put('/seler/products/:id',validateToken, updateProduct);

router.get('/selerPage',SellersPages );

router.get('/vehicale_owner/dashboard',validateToken,getUserProfile );
router.get('/vehicaleowner',VehicalOwnerPage );
router.get('/seler/profile',validateToken, getUser);
router.put('/seler/profile',validateToken, updateUserProfile);

router.get('/user/daylyproducts',validateToken,productveiw);
router.post('/cart/add',validateToken,addToCart);
router.get('/cart/add',validateToken,cartitem);
router.delete('/cart/:id', addcartitemdelete);

router.post('/vehicaleOwn/products',validateToken,upload.single('photo'),registerVehicle);
router.get('/vehicaleOwn/products', validateToken, getRegisteredVehicles);
router.put('/vehicaleOwn/products/:id', validateToken, UpdateVehicaledata);
router.delete('/vehicaleOwn/products/:id', validateToken, deleteVehicle);
router.get('/vehicaleOwn/:id', vehicale_owners_vehicle);


router.post('/user/book-vehicle',booking);


router.post('/user/forgetpassword',ForgetPassword);
router.post('/user/resetPassword',ResetPassword);


module.exports = router;
