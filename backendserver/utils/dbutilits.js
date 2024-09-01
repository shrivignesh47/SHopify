const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

const getDatabaseUri = (userId) => {
    return `${MONGO_URI}/${userId}`;
};

const createDatabase = async (userId) => {
    const dbUri = getDatabaseUri(userId);
    try {
        const connection = await mongoose.createConnection(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).asPromise();

        // You might want to create necessary collections here
        console.log(`Database created for user ${userId}`);
        connection.close();
    } catch (err) {
        console.error('Error creating database:', err);
    }
};

module.exports = { createDatabase, getDatabaseUri };
