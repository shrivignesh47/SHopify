// middleware/dbConnectionMiddleware.js
const mongoose = require('mongoose');
const { getDatabaseUri } = require('../utils/dbutilits');

const dbConnectionMiddleware = async (req, res, next) => {
    if (req.user) {
        try {
            const userId = req.user._id.toString();
            const dbUri = getDatabaseUri(userId);

            // Check if the database connection already exists
            if (!mongoose.connections.some(conn => conn.name === dbUri)) {
                await mongoose.createConnection(dbUri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }).asPromise();
            }

            next();
        } catch (err) {
            res.status(500).json({ msg: 'Database connection error', error: err.message });
        }
    } else {
        res.status(401).json({ msg: 'Unauthorized' });
    }
};

module.exports = dbConnectionMiddleware;
