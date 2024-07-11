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
                return res.status(400).send({ message: 'User already exists' });
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create a new user
            const newUser = new User({ name, email, password: hashedPassword });

            // save the user to the database
            const savedUser = await newUser.save();

            // return the saved user
            res.status(201).send({ message: 'Registration successful' });
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
                return res.status(400).send({ message: 'User does not exist' });
            }

            // check if the password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            // if the password is incorrect, return an error
            if (!isPasswordCorrect) {
                return res.status(400).send({ message: 'Invalid password' });
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
            res.status(200).send({ message: 'Login successful', user: user });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    logout: async (req, res) => {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(400).send({ message: 'User not authenticated' });
            }

            // clear the cookie
            res.clearCookie('token');

            // return the user
            res.status(200).send({ message: 'Logout successful' });

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
                return res.status(400).send({ message: 'User does not exist' });
            }

            // return the user profile
            res.status(200).send({ message: 'User profile', user: userProfile });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    updateProfile: async (req, res) => {
        try {
            // get the user id from the request object
            const userId = req.userId;

            // get the user inputs from the request body
            const { name, email } = req.body;

            // find the user by id
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return res.send({ message: 'User does not exist' });
            }

            // update the user profile
            user.name = name || user.name;
            user.email = email || user.email;

            // save the user to the database
            const updatedUser = await user.save();

            // return the updated user profile
            res.send({ message: 'User profile updated successfully', user: updatedUser });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    deleteProfile: async (req, res) => {
        try {
            // get the user id from the request object
            const userId = req.userId;

            // find the user by id and delete
            const deletedUser = await User.findByIdAndDelete(userId);

            // if the user does not exist, return an error
            if (!deletedUser) {
                return res.send({ message: 'User does not exist' });
            }

            // return the deleted user
            res.send({ message: 'User deleted successfully', user: deletedUser });

        } catch (error) {
            res.send({ message: error.message })
        }
    },
    getUsers: async (req, res) => {
        try {
            // find all users
            const users = await User.find();

            // return the users
            res.send({ message: 'All users', users });

        } catch (error) {
            res.send({ message: error.message })
        }
    },
    getUser: async (req, res) => {
        try {
            // get the user id from the request parameters
            const userId = req.params.id;

            // find the user by id
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return res.send({ message: 'User does not exist' });
            }

            // return the user
            res.send({ message: 'User', user });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    updateUser: async (req, res) => {
        try {
            // get the user id from the request parameters
            const userId = req.params.id;

            // get the user inputs from the request body
            const { name, email } = req.body;

            // find the user by id
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return res.send({ message: 'User does not exist' });
            }

            // update the user profile
            user.name = name || user.name;
            user.email = email || user.email;

            // save the user to the database
            const updatedUser = await user.save();

            // return the updated user profile
            res.send({ message: 'User updated successfully', user: updatedUser });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    deleteUser: async (req, res) => {
        try {
            // get the user id from the request parameters
            const userId = req.params.id;

            // find the user by id and delete
            const deletedUser = await User.findByIdAndDelete(userId);

            // if the user does not exist, return an error
            if (!deletedUser) {
                return res.send({ message: 'User does not exist' });
            }

            // return the deleted user
            res.send({ message: 'User deleted successfully', user: deletedUser });

        } catch (error) {
            res.send({ message: error.message })
        }
    },
    checkAuth: async (req, res) => {
        try {
            // get the token from the request cookies
            const token = req.cookies.token;

            // if the token does not exist, return an error
            if (!token) {
                return res.status(401).send({ message: 'Access denied' });
            }

            // verify the token
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                return res.status(200).send({ message: 'Valid token' });
            } catch (error) {
                return res.status(401).send({ message: 'Invalid token' });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
}

module.exports = userController;