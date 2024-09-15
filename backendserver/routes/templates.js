const express = require('express');
const multer = require('multer');
const path = require('path');
const TemplateController = require('../controllers/TemplateController');
const authMiddleware = require('../middlewares/authMiddleware'); // Authentication middleware

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/')); // Change this to your desired upload folder
    },
    filename: (req, file, cb) => {
        // Add timestamp to avoid filename collisions and maintain file extension
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        // Ensure only image files (jpeg, png) are uploaded
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed (jpeg, jpg, png)'));
        }
    }
});

// Route to get all templates
router.get('/', authMiddleware, TemplateController.getAllTemplates);

// Route to add a new template
router.post('/', authMiddleware, upload.single('logo'), TemplateController.addTemplate);

// Route to get a template by ID
router.get('/:id', authMiddleware, TemplateController.getTemplateById);

// Route to update a template by ID
router.put('/:id', authMiddleware, upload.single('logo'), TemplateController.updateTemplate);

// Route to delete a template by ID
router.delete('/:id', authMiddleware, TemplateController.deleteTemplate);

module.exports = router;
