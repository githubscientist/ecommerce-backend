const multer = require('multer');
const User = require('../models/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.userId;
        cb(null, `uploads/${userId}/`);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

module.exports = multer({ storage: storage });