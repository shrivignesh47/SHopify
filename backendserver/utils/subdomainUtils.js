// utils/subdomainUtils.js
const Tenant = require('../models/Tenant'); // Assuming you have a Tenant model

const createSubdomain = async (subdomain) => {
    try {
        // Check if the tenant already exists
        let tenant = await Tenant.findOne({ subdomain });
        if (!tenant) {
            // Create a new tenant
            tenant = new Tenant({ subdomain });
            await tenant.save();
            console.log(`Tenant ${subdomain} created`);
        } else {
            console.log(`Tenant ${subdomain} already exists`);
        }
    } catch (error) {
        console.error('Error creating subdomain:', error);
    }
};

module.exports = { createSubdomain };
