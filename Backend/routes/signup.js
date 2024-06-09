const express = require('express');
const { registerUser, loginUser, getUserProfile,
        SellersPages,InstructerPage,VehicalOwnerPage ,
        updateUserProfile,getUser,ForgetPassword,
        ResetPassword,    
        Products,getProducts,productdelete,updateProduct,
        productveiw,registerVehicle,
        getRegisteredVehicles,UpdateVehicaledata,deleteVehicle,
        vehicale_owners_vehicle,
        booking,PostRequest,getRequestHistory,requestAccept
        ,DeleteRequest,viewMessage,deleteMessage
    ,uploadPaymentReceipt,getUploadPhoto,UploadVideoContent,getUploadedPost,
    deleteContent,updateCourse} = require('../contollers/userController');
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
router.get('/profile',validateToken, getUser);
router.put('/profile',validateToken, updateUserProfile);

router.get('/user/daylyproducts',validateToken,productveiw);

router.post('/vehicaleOwn/products',validateToken,upload.single('photo'),registerVehicle);
router.get('/vehicaleOwn/products', validateToken, getRegisteredVehicles);
router.put('/vehicaleOwn/products/:id', validateToken, UpdateVehicaledata);
router.delete('/vehicaleOwn/products/:id', validateToken, deleteVehicle);

router.get('/vehicaleOwn/:ownerId', vehicale_owners_vehicle);


router.post('/user/book-vehicle',validateToken,booking);


router.post('/user/forgetpassword',ForgetPassword);
router.post('/user/resetPassword',ResetPassword);

router.post('/request',validateToken,PostRequest);
router.get('/seller/requests',validateToken,getRequestHistory);
router.get('/seller/receipt',validateToken,getUploadPhoto);
router.post('/seller/requests/accept/:requestId/:userId/:sellerId',validateToken,requestAccept);
router.delete('/seller/requests/:requestId',validateToken,DeleteRequest);

router.get('/message/user/:userId', validateToken, viewMessage);
router.delete('/message/delete/:messageId', validateToken, deleteMessage);

router.post('/upload/paymentReceipt',validateToken, upload.single('file'), uploadPaymentReceipt);

router.get('/allInstructer', InstructerPage);


router.post('/instructer/uploadfile',validateToken, upload.single('thumbnail'), UploadVideoContent);
router.get('/contentcreater/uploadedpost',validateToken, getUploadedPost);
router.delete('/contentcreater/uploadedpost/:courseId',validateToken, deleteContent);
router.put('/contentcreater/uploadedpost/:updatingCourseId',validateToken, updateCourse);






module.exports = router;
