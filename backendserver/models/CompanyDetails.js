// backend/models/CompanyDetails.js
const mongoose = require('mongoose');

const CompanyDetailsSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    gstin: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
}, { timestamps: true });

module.exports = CompanyDetailsSchema;
