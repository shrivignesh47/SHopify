const mongoose = require('mongoose');

const connectUserDb = async (userId) => {
    const dbURI = `mongodb://localhost:27017/user_${userId}`;

    try {
        // Create a new connection instance for the user's database
        const userDbConnection = mongoose.createConnection(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        userDbConnection.on('connected', () => {
            console.log(`Connected to database for user ${userId}`);
        });

        userDbConnection.on('error', (err) => {
            console.error(`Connection error for user ${userId}:`, err);
        });

        userDbConnection.on('disconnected', () => {
            console.log(`Disconnected from database for user ${userId}`);
        });

        // Ensure the connection is established before returning
        await new Promise((resolve, reject) => {
            userDbConnection.once('open', resolve);
            userDbConnection.once('error', reject);
        });

        return userDbConnection;
    } catch (err) {
        console.error(`Failed to connect to database for user ${userId}:`, err);
        throw err;
    }
};

module.exports = connectUserDb;
