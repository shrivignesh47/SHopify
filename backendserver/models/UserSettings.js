// backend/models/UserSettings.js
const mongoose = require('mongoose');

const UserSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = UserSettingsSchema;
