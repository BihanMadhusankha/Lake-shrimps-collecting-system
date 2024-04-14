const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


//@desc Register a user 
//@route GET /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
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

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
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

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });
    //compair password 
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = JWT.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' });
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