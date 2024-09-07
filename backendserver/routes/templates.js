const express = require('express');
const multer = require('multer');
const path = require('path');
const TemplateController = require('../controllers/TemplateController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the authentication middleware

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/')); // Change this to your desired upload folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid filename collisions
    }
});
const upload = multer({ storage });

// Route to get all templates
router.get('/', authMiddleware, TemplateController.getAllTemplates);

// Route to add a new template
router.post('/', authMiddleware, upload.single('logo'), TemplateController.addTemplate);

// Route to get a template by ID
router.get('/:id', authMiddleware, TemplateController.getTemplateById);

// Route to update a template
router.put('/:id', authMiddleware, upload.single('logo'), TemplateController.updateTemplate);

// Route to delete a template
router.delete('/:id', authMiddleware, TemplateController.deleteTemplate);

module.exports = router;
