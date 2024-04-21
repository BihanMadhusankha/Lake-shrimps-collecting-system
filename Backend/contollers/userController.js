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

//@desc current user info
//@route POST /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});


module.exports = {
    loginUser: loginUser,
    registerUser: registerUser,
    currentUser: currentUser
}