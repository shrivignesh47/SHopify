const mongoose = require('mongoose');

module.exports = async function createUserDatabase(userId) {
    const dbName = `db_${userId}`;
    const uri = `mongodb://localhost:27017/${dbName}`;

    try {
        const conn = await mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Database created for user ${userId}`);
        conn.close(); // Close connection after creating the database
    } catch (error) {
        console.error(`Failed to create database for user ${userId}`, error);
        throw error;
    }
};
