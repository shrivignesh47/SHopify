// const Product = require('../models/Product');
// const path = require('path');
// const fs = require('fs');

// // Helper function to handle file uploads
// const uploadFile = (file) => {
//     return new Promise((resolve, reject) => {
//         const uploadPath = path.join(__dirname, '../uploads/', file.originalname);
//         fs.writeFile(uploadPath, file.buffer, (err) => {
//             if (err) reject(err);
//             else resolve(uploadPath);
//         });
//     });
// };

// // Get all products
// const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Add a new product
// const addProduct = async (req, res) => {
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
//     const images = req.files ? req.files.map(file => file.path) : [];

//     try {
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
//             seoKeywords: seoKeywords ? seoKeywords.split(',') : [],
//             images
//         });

//         const savedProduct = await newProduct.save();
//         res.status(201).json(savedProduct);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Get a single product by ID
// const getProductById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const product = await Product.findById(id);
//         if (product) {
//             res.status(200).json(product);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Update a product by ID
// const updateProduct = async (req, res) => {
//     const { id } = req.params;
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
//     const images = req.files ? req.files.map(file => file.path) : [];

//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(id, {
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
//             seoKeywords: seoKeywords ? seoKeywords.split(',') : [],
//             images
//         }, { new: true });

//         if (updatedProduct) {
//             res.status(200).json(updatedProduct);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Delete a product by ID
// const deleteProduct = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedProduct = await Product.findByIdAndDelete(id);
//         if (deletedProduct) {
//             res.status(200).json({ message: 'Product deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// module.exports = {
//     getAllProducts,
//     addProduct,
//     getProductById,
//     updateProduct,
//     deleteProduct
// };


// const path = require('path');
// const fs = require('fs');
// const connectUserDb = require('../utils/connectUserDb');
// const ProductSchema = require('../models/Product');

// const uploadFiles = async (files) => {
//     const uploadPaths = [];

//     for (const file of files) {
//         const uploadPath = path.join(__dirname, '../uploads/', file.originalname);
//         await fs.promises.writeFile(uploadPath, file.buffer);
//         uploadPaths.push(uploadPath);
//     }

//     return uploadPaths;
// };

// const getAllProducts = async (req, res) => {
//     const userId = req.user._id;

//     try {
//         const userDb = await connectUserDb(userId);
//         const Product = userDb.model('Product', ProductSchema);
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (err) {
//         console.error('Error fetching products:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const addProduct = async (req, res) => {
//     const userId = req.user._id;

//     try {
//         const userDb = await connectUserDb(userId);
//         const Product = userDb.model('Product', ProductSchema);

//         const {
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
//             seoKeywords
//         } = req.body;

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
//     }
// };

// const getProductById = async (req, res) => {
//     const userId = req.user._id;
//     const { id } = req.params;

//     try {
//         const userDb = await connectUserDb(userId);
//         const Product = userDb.model('Product', ProductSchema);
//         const product = await Product.findById(id);

//         if (product) {
//             res.status(200).json(product);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (err) {
//         console.error('Error fetching product by ID:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const updateProduct = async (req, res) => {
//     const userId = req.user._id;
//     const { id } = req.params;

//     try {
//         const userDb = await connectUserDb(userId);
//         const Product = userDb.model('Product', ProductSchema);

//         const {
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
//             seoKeywords
//         } = req.body;

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
//     }
// };

// const deleteProduct = async (req, res) => {
//     const userId = req.user._id;
//     const { id } = req.params;

//     try {
//         const userDb = await connectUserDb(userId);
//         const Product = userDb.model('Product', ProductSchema);
//         const deletedProduct = await Product.findByIdAndDelete(id);

//         if (deletedProduct) {
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
//     }
// };

// module.exports = {
//     getAllProducts,
//     addProduct,
//     getProductById,
//     updateProduct,
//     deleteProduct
// };



const path = require('path');
const fs = require('fs');
const connectUserDb = require('../utils/connectUserDb');
const ProductSchema = require('../models/Product');

// Upload files to the server
const uploadFiles = async (files) => {
    const uploadPaths = [];

    for (const file of files) {
        const uploadPath = path.join(__dirname, '../uploads/', file.originalname);
        await fs.promises.writeFile(uploadPath, file.buffer);
        uploadPaths.push(uploadPath);
    }

    return uploadPaths;
};

// Get all products
const getAllProducts = async (req, res) => {
    const userId = req.user._id;

    try {
        const userDb = await connectUserDb(userId);
        const Product = userDb.model('Product', ProductSchema); // Ensure ProductSchema is correct here
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    const userId = req.user._id;

    try {
        const userDb = await connectUserDb(userId);

        // Ensure ProductSchema is a valid Mongoose Schema
        const Product = userDb.model('Product', ProductSchema); // Ensure ProductSchema is correct here

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

        const images = req.files ? await uploadFiles(req.files) : [];

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
            seoKeywords: seoKeywords ? seoKeywords.split(',').map(keyword => keyword.trim()) : [],
            images
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: 'Product added successfully',
            product: savedProduct
        });
    } catch (err) {
        console.error('Error adding product:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation error', details: err.errors });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const userDb = await connectUserDb(userId);
        const Product = userDb.model('Product', ProductSchema); // Ensure ProductSchema is correct here
        const product = await Product.findById(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const userDb = await connectUserDb(userId);

        // Ensure ProductSchema is a valid Mongoose Schema
        const Product = userDb.model('Product', ProductSchema); // Ensure ProductSchema is correct here

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

        const images = req.files ? await uploadFiles(req.files) : [];

        const updatedData = {
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
            seoKeywords: seoKeywords ? seoKeywords.split(',').map(keyword => keyword.trim()) : [],
            ...(images.length > 0 && { images }) // Only include images if any were uploaded
        };

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(400).json({ message: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const userDb = await connectUserDb(userId);
        const Product = userDb.model('Product', ProductSchema); // Ensure ProductSchema is correct here
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (deletedProduct) {
            if (deletedProduct.images && deletedProduct.images.length > 0) {
                for (const imagePath of deletedProduct.images) {
                    await fs.promises.unlink(imagePath);
                }
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
