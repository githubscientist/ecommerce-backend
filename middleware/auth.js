const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');

const auth = {
    verifyToken: async (req, res, next) => {
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
                req.userId = decoded.id;
                next();
            } catch (error) {
                return res.status(401).send({ message: 'Invalid token' });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    isAdmin: async (req, res, next) => {
        try {
            // get the userId from the request object
            const userId = req.userId;

            // find the user in the database
            const user = await User.findById(userId);

            // if the user is not found, return an error
            if (!user) {
                return res.send({ message: 'User not found' });
            }

            // if the user is not an admin, return an error
            if (user.role !== 'admin') {
                return res.send({ message: 'Unauthorized' });
            }

            next();
        } catch (error) {
            res.send({ message: error.message })
        }
    }
}

module.exports = auth;