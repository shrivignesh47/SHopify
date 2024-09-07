const connectUserDb = require('../utils/connectUserDb');
const CompanyDetailsSchema = require('../models/CompanyDetails');
const UserSettingsSchema = require('../models/UserSettings');

// Company Details
exports.getCompanyDetails = async (req, res) => {
    const userId = req.user._id;

    try {
        const userDb = await connectUserDb(userId);
        const CompanyDetails = userDb.model('CompanyDetails', CompanyDetailsSchema);
        const companyDetails = await CompanyDetails.findOne();

        if (!companyDetails) {
            return res.status(404).json({ message: 'Company details not found' });
        }
        res.status(200).json(companyDetails);
    } catch (err) {
        console.error('Error fetching company details:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateCompanyDetails = async (req, res) => {
    const userId = req.user._id;
    const { companyName, address, gstin, contactEmail, contactPhone } = req.body;

    try {
        const userDb = await connectUserDb(userId);
        const CompanyDetails = userDb.model('CompanyDetails', CompanyDetailsSchema);
        
        let companyDetails = await CompanyDetails.findOne();
        if (companyDetails) {
            companyDetails.companyName = companyName;
            companyDetails.address = address;
            companyDetails.gstin = gstin;
            companyDetails.contactEmail = contactEmail;
            companyDetails.contactPhone = contactPhone;
        } else {
            companyDetails = new CompanyDetails({ companyName, address, gstin, contactEmail, contactPhone });
        }

        await companyDetails.save();
        res.status(200).json({ message: 'Company details updated successfully', companyDetails });
    } catch (err) {
        console.error('Error updating company details:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Settings
exports.getUserSettings = async (req, res) => {
    const userId = req.user._id;

    try {
        const userDb = await connectUserDb(userId);
        const UserSettings = userDb.model('UserSettings', UserSettingsSchema);
        const userSettings = await UserSettings.findOne({ userId });

        if (!userSettings) {
            return res.status(404).json({ message: 'User settings not found' });
        }
        res.status(200).json(userSettings);
    } catch (err) {
        console.error('Error fetching user settings:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUserSettings = async (req, res) => {
    const userId = req.user._id;
    const { theme, notifications } = req.body;

    try {
        const userDb = await connectUserDb(userId);
        const UserSettings = userDb.model('UserSettings', UserSettingsSchema);

        let userSettings = await UserSettings.findOne({ userId });
        if (userSettings) {
            userSettings.theme = theme;
            userSettings.notifications = notifications;
        } else {
            userSettings = new UserSettings({ userId, theme, notifications });
        }

        await userSettings.save();
        res.status(200).json({ message: 'User settings updated successfully', userSettings });
    } catch (err) {
        console.error('Error updating user settings:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
