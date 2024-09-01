const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// Helper function to handle file uploads
const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const uploadPath = path.join(__dirname, '../uploads/', file.originalname);
        fs.writeFile(uploadPath, file.buffer, (err) => {
            if (err) reject(err);
            else resolve(uploadPath);
        });
    });
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    const {
        productId,
        name,
        description,
        category,
        size,
        gender,
        price,
        discount,
        stock,
        seoTitle,
        seoDescription,
        seoKeywords
    } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        const newProduct = new Product({
            productId,
            name,
            description,
            category,
            size,
            gender,
            price,
            discount,
            stock,
            seoTitle,
            seoDescription,
            seoKeywords: seoKeywords ? seoKeywords.split(',') : [],
            images
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        productId,
        name,
        description,
        category,
        size,
        gender,
        price,
        discount,
        stock,
        seoTitle,
        seoDescription,
        seoKeywords
    } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            productId,
            name,
            description,
            category,
            size,
            gender,
            price,
            discount,
            stock,
            seoTitle,
            seoDescription,
            seoKeywords: seoKeywords ? seoKeywords.split(',') : [],
            images
        }, { new: true });

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
// const path = require('path');
// const fs = require('fs');
// const connectUserDb = require('../utils/connectUserDb');
// const ProductSchema = require('../models/Product');

// // Helper function to handle file uploads
// const uploadFiles = async (files) => {
//     const uploadPaths = [];

//     for (const file of files) {
//         const uploadPath = path.join(__dirname, '../uploads/', file.originalname);

//         await fs.promises.writeFile(uploadPath, file.buffer);
//         uploadPaths.push(uploadPath);
//     }

//     return uploadPaths;
// };

// // Get all products
// const getAllProducts = async (req, res) => {
//     const userId = req.user._id;

//     const userDb = connectUserDb(userId);
//     const Product = userDb.model('Product', ProductSchema);

//     try {
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (err) {
//         console.error('Error fetching products:', err);
//         res.status(500).json({ message: 'Server error' });
//     } finally {
//         await userDb.close();
//     }
// };

// // Add a new product
// const addProduct = async (req, res) => {
//     const userId = req.user._id;

//     const userDb = connectUserDb(userId);
//     const Product = userDb.model('Product', ProductSchema);

//     const {
//         productId,
//         name,
//         description,
//         category,
//         size,
//         gender,
//         price,
//         discount,
//         stock,
//         seoTitle,
//         seoDescription,
//         seoKeywords
//     } = req.body;

//     try {
//         const images = req.files ? await uploadFiles(req.files) : [];

//         const newProduct = new Product({
//             productId,
//             name,
//             description,
//             category,
//             size,
//             gender,
//             price,
//             discount,
//             stock,
//             seoTitle,
//             seoDescription,
//             seoKeywords: seoKeywords ? seoKeywords.split(',').map(keyword => keyword.trim()) : [],
//             images
//         });

//         const savedProduct = await newProduct.save();
//         res.status(201).json(savedProduct);
//     } catch (err) {
//         console.error('Error adding product:', err);
//         res.status(400).json({ message: err.message });
//     } finally {
//         await userDb.close();
//     }
// };

// // Get a single product by ID
// const getProductById = async (req, res) => {
//     const userId = req.user._id;
//     const { id } = req.params;

//     const userDb = connectUserDb(userId);
//     const Product = userDb.model('Product', ProductSchema);

//     try {
//         const product = await Product.findById(id);
//         if (product) {
//             res.status(200).json(product);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (err) {
//         console.error('Error fetching product by ID:', err);
//         res.status(500).json({ message: 'Server error' });
//     } finally {
//         await userDb.close();
//     }
// };

// // Update a product by ID
// const updateProduct = async (req, res) => {
//     const userId = req.user._id;
//     const { id } = req.params;

//     const userDb = connectUserDb(userId);
//     const Product = userDb.model('Product', ProductSchema);

//     const {
//         productId,
//         name,
//         description,
//         category,
//         size,
//         gender,
//         price,
//         discount,
//         stock,
//         seoTitle,
//         seoDescription,
//         seoKeywords
//     } = req.body;

//     try {
//         const images = req.files ? await uploadFiles(req.files) : [];

//         const updatedData = {
//             productId,
//             name,
//             description,
//             category,
//             size,
//             gender,
//             price,
//             discount,
//             stock,
//             seoTitle,
//             seoDescription,
//             seoKeywords: seoKeywords ? seoKeywords.split(',').map(keyword => keyword.trim()) : [],
//         };

//         if (images.length > 0) {
//             updatedData.images = images;
//         }

//         const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

//         if (updatedProduct) {
//             res.status(200).json(updatedProduct);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (err) {
//         console.error('Error updating product:', err);
//         res.status(400).json({ message: err.message });
//     } finally {
//         await userDb.close();
//     }
// };

// // Delete a product by ID
// const deleteProduct = async (req, res) => {
//     const userId = req.user._id;
//     const { id } = req.params;

//     const userDb = connectUserDb(userId);
//     const Product = userDb.model('Product', ProductSchema);

//     try {
//         const deletedProduct = await Product.findByIdAndDelete(id);
//         if (deletedProduct) {
//             // Optionally delete associated image files
//             if (deletedProduct.images && deletedProduct.images.length > 0) {
//                 for (const imagePath of deletedProduct.images) {
//                     await fs.promises.unlink(imagePath);
//                 }
//             }
//             res.status(200).json({ message: 'Product deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (err) {
//         console.error('Error deleting product:', err);
//         res.status(500).json({ message: 'Server error' });
//     } finally {
//         await userDb.close();
//     }
// };

// module.exports = {
//     getAllProducts,
//     addProduct,
//     getProductById,
//     updateProduct,
//     deleteProduct
// };
