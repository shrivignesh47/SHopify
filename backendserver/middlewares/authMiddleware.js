const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = async (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // If no token is provided, respond with 401 Unauthorized
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Use the correct field from the decoded payload (_id or id)
        const user = await User.findById(decoded._id); // Change _id if necessary

        // If no user is found, respond with 401 Unauthorized
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach the user object to the request
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Handle token verification errors
        res.status(401).json({ message: 'Invalid token', error: err.message });
    }
};
