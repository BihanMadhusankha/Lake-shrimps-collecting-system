const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

//@desc Register a user 
//@route POST /api/signup/
//@access public
const registerUser = asyncHandler(async (req, res) => {
    
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
        confirmPassword, } = req.body;

    if (!firstname|| !lastname || !role || !email || !birthday || !gender || !phone || !nic || !state || !password || !confirmPassword) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(confirmPassword, 10);

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
        password,
        confirmPassword : hashedPassword,
    })

    console.log(`User created: ${user}`);
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        })
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({
        message: "Register the user"
    })
});

//@desc login a user 
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {

    const { email, confirmPassword } = req.body;
    if (!email || !confirmPassword) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });
    //compair password 
    if (user && (await bcrypt.compare(confirmPassword, user.confirmPassword))) {
        const accessToken = JWT.sign({
            user: {
                firstname: user.firstname,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' });
            // res.cookie(accessToken)
            console.log(accessToken);
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("email or password is not valid");
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