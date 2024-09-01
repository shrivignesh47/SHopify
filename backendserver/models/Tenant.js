const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TenantSchema = new Schema({
    domain: { type: String, unique: true },
    settings: Schema.Types.Mixed, // Adjust according to your needs
    // other tenant-specific fields
});

module.exports = mongoose.model('Tenant', TenantSchema);
