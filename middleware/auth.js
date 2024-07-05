const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const auth = {
    verifyToken: async (req, res, next) => {
        try {
            // get the token from the request cookies
            const token = req.cookies.token;

            // if the token does not exist, return an error
            if (!token) {
                return res.send({ message: 'Token not found' });
            }

            // verify the token
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                req.userId = decoded.id;
                next();
            } catch (error) {
                return res.send({ message: 'Invalid token' });
            }
        } catch (error) {
            res.send({ message: error.message })
        }
    }
}

module.exports = auth;