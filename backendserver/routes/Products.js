// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const multer = require('multer');

// // Configure multer for file uploads
// const storage = multer.memoryStorage(); // Use memory storage for simplicity
// const upload = multer({ storage: storage });

// // Get all products
// router.get('/', productController.getAllProducts);

// // Add a new product
// router.post('/', upload.array('images'), productController.addProduct);

// // Get a single product by ID
// router.get('/:id', productController.getProductById);

// // Update a product by ID
// router.put('/:id', upload.array('images'), productController.updateProduct);

// // Delete a product by ID
// router.delete('/:id', productController.deleteProduct);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Import the authentication middleware
const productController = require('../controllers/ProductController');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });

// Get all products (authentication might be optional here based on your use case)
router.get('/', authMiddleware, productController.getAllProducts);

// Add a new product
router.post('/', authMiddleware, upload.array('images'), productController.addProduct);

// Get a single product by ID
router.get('/:id', authMiddleware, productController.getProductById);

// Update a product by ID
router.put('/:id', authMiddleware, upload.array('images'), productController.updateProduct);

// Delete a product by ID
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
