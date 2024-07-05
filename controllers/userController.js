const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const userController = {
    // getData: (req, res) => {
    //     res.send('Hello World!!');
    // },
    register: async (req, res) => {
        try {
            // get the user inputs from the request body
            const { name, email, password } = req.body;

            // check if the user already exists in the database
            const user = await User.findOne({ email });

            // if the user already exists, return an error
            if (user) {
                return res.send({ message: 'User already exists' });
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create a new user
            const newUser = new User({ name, email, password: hashedPassword });

            // save the user to the database
            const savedUser = await newUser.save();

            // return the saved user
            res.send({ message: 'User created successfully', user: savedUser });
        } catch (error) {
            res.send({ message: error.message })
        }
    },
    login: async (req, res) => {
        try {
            // get the user inputs from the request body
            const { email, password } = req.body;

            // check if the user exists in the database
            const user = await User.findOne({ email });

            // if the user does not exist, return an error
            if (!user) {
                return res.send({ message: 'User does not exist' });
            }

            // check if the password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            // if the password is incorrect, return an error
            if (!isPasswordCorrect) {
                return res.send({ message: 'Invalid credentials' });
            }

            // create a token
            const token = jwt.sign({ id: user._id }, JWT_SECRET);

            //  set a cookie with the token
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)  // 24 hours from now
            });

            // return the user
            res.send({ message: 'Login successful' });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    logout: async (req, res) => {
        try {
            // clear the cookie
            res.clearCookie('token');

            // return the user
            res.send({ message: 'Logout successful' });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    // get the user profile
    getProfile: async (req, res) => {
        try {
            // get the user id from the request object
            const userId = req.userId;


            // find the user by id
            const userProfile = await User.findById(userId);

            // if the user does not exist, return an error
            if (!userProfile) {
                return res.send({ message: 'User does not exist' });
            }

            // return the user profile
            res.send({ message: 'User profile', user: userProfile });

        } catch (error) {
            res.send({ message: error.message })
        }
    }
    
}

module.exports = userController;