const express = require('express');
const router = express.Router();
const SettingsController = require('../controllers/SettingsController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import authentication middleware

// Company Details Routes
router.get('/company-details', authMiddleware, SettingsController.getCompanyDetails);
router.post('/company-details', authMiddleware, SettingsController.updateCompanyDetails);

// User Settings Routes
router.get('/user-settings', authMiddleware, SettingsController.getUserSettings);
router.post('/user-settings', authMiddleware, SettingsController.updateUserSettings);

module.exports = router;
