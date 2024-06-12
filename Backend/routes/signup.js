const express = require('express');
const { registerUser, loginUser, getUserProfile,
        SellersPages,VehicalOwnerPage ,    
        Products,getProducts,productdelete,updateProduct,
        productveiw,
        booking,PostRequest,getRequestHistory,requestAccept
        ,DeleteRequest,viewMessage,deleteMessage
    ,uploadPaymentReceipt,getUploadPhoto,search} = require('../contollers/userController');
const validateToken = require('../midleware/validationTokenHandler');
const upload = require('../midleware/uploadMiddleware');

const router = express.Router();

router.post('/user/signup', registerUser) 
router.post('/user/login',loginUser);
router.get('/user/userhome',validateToken,getUserProfile);


router.get('/search',search);



router.get('/user/daylyproducts',validateToken,productveiw);
router.post('/user/book-vehicle',validateToken,booking);

router.post('/request',validateToken,PostRequest);
router.get('/message/user/:userId', validateToken, viewMessage);
router.delete('/message/delete/:messageId', validateToken, deleteMessage);
router.post('/upload/paymentReceipt',validateToken, upload.single('file'), uploadPaymentReceipt);

router.get('/seler/dashboard',validateToken,getUserProfile);
router.post('/seler/products',validateToken,Products);
router.get('/seler/products',validateToken, getProducts);
router.delete('/seler/products/:id',validateToken, productdelete);
router.put('/seler/products/:id',validateToken, updateProduct);
router.get('/selerPage',SellersPages );
router.get('/seller/requests',validateToken,getRequestHistory);
router.get('/seller/receipt',validateToken,getUploadPhoto);
router.post('/seller/requests/accept/:requestId/:userId/:sellerId',validateToken,requestAccept);
router.delete('/seller/requests/:requestId',validateToken,DeleteRequest);

router.get('/vehicale_owner/dashboard',validateToken,getUserProfile );
router.get('/vehicaleowner',VehicalOwnerPage );




module.exports = router;
