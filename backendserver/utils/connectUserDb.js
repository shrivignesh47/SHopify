// utils/connectUserDb.js
const mongoose = require('mongoose');

const connectUserDb = (userId) => {
    const dbName = `user_${userId}`;
    const dbURI = `${process.env.MONGO_URI}/${dbName}`;

    return mongoose.createConnection(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = connectUserDb;
