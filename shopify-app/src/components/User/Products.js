import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'; // Import CSS for styling
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique product IDs

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(null); // State for editing a product
    const [categories, setCategories] = useState([
        { _id: '1', name: 'Electronics' },
        { _id: '2', name: 'Clothing' },
        { _id: '3', name: 'Home & Kitchen' },
        { _id: '4', name: 'Books' },
        { _id: '5', name: 'Sports' }
    ]); // Sample categories

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products', err);
            }
        };

        fetchProducts();
    }, []);

    const handleAddProductClick = () => {
        setEditProduct(null); // Reset the edit state
        setShowAddProduct(true);
    };

    const handleEditProductClick = (product) => {
        setEditProduct(product);
        setShowAddProduct(true);
    };

    const handleDeleteProductClick = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:3000/api/products/${productId}`);
                setProducts(products.filter(product => product._id !== productId));
                alert('Product deleted successfully');
            } catch (err) {
                console.error('Error deleting product', err);
            }
        }
    };

    return (
        <div className="products-container">
            {showAddProduct ? (
                <AddProductForm 
                    categories={categories} 
                    productToEdit={editProduct} 
                    onClose={() => setShowAddProduct(false)} 
                    onProductSaved={(newProduct, isEdit) => {
                        if (isEdit) {
                            setProducts(products.map(product => product._id === newProduct._id ? newProduct : product));
                        } else {
                            setProducts([...products, newProduct]);
                        }
                        setShowAddProduct(false);
                    }}
                />
            ) : (
                <>
                    <button className="add-product-button" onClick={handleAddProductClick}>Add New Product</button>
                    <div className="products-table-container">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product.productId}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.category}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <button onClick={() => handleEditProductClick(product)}>Edit</button>
                                            <button onClick={() => handleDeleteProductClick(product._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

const AddProductForm = ({ categories, productToEdit, onClose, onProductSaved }) => {
    const [formData, setFormData] = useState({
        productId: productToEdit ? productToEdit.productId : uuidv4(),
        name: productToEdit ? productToEdit.name : '',
        description: productToEdit ? productToEdit.description : '',
        category: productToEdit ? productToEdit.category : '',
        newCategory: '',
        size: productToEdit ? productToEdit.size : '',
        gender: productToEdit ? productToEdit.gender : '',
        price: productToEdit ? productToEdit.price : 0,
        discount: productToEdit ? productToEdit.discount : 0,
        stock: productToEdit ? productToEdit.stock : 0,
        seoTitle: productToEdit ? productToEdit.seoTitle : '',
        seoDescription: productToEdit ? productToEdit.seoDescription : '',
        seoKeywords: productToEdit ? productToEdit.seoKeywords : '',
        images: []
    });

    const sizes = {
        'Electronics': [],
        'Clothing': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        'Home & Kitchen': [],
        'Books': [],
        'Sports': ['S', 'M', 'L', 'XL']
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files : value
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFormData(prevData => ({
            ...prevData,
            category: selectedCategory,
            size: sizes[selectedCategory] ? prevData.size : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (Array.isArray(formData[key])) {
                Array.from(formData[key]).forEach(file => formDataToSend.append(key, file));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            let response;
            if (productToEdit) {
                // Update existing product
                response = await axios.put(`http://localhost:3000/api/products/${productToEdit._id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert('Product updated successfully');
            } else {
                // Add new product
                response = await axios.post('http://localhost:3000/api/products', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert('Product added successfully');
            }
            onProductSaved(response.data, !!productToEdit);
        } catch (err) {
            console.error('Error saving product', err);
        }
    };

    return (
        <div className="add-product-container">
            <div className="add-product-card">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
                <div className="product-form-grid">
                    <div className="form-section">
                        <div className="form-group">
                            <label>Product ID</label>
                            <div className="form-field">{formData.productId}</div>
                        </div>
                        <div className="form-group">
                            <label>Product Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleCategoryChange}>
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                                ))}
                                <option value="New">Add new category</option>
                            </select>
                            {formData.category === 'New' && (
                                <input type="text" name="newCategory" placeholder="New category" value={formData.newCategory} onChange={handleChange} />
                            )}
                        </div>
                        <div className="form-group">
                            <label>Size</label>
                            {sizes[formData.category] ? (
                                <select name="size" value={formData.size} onChange={handleChange}>
                                    <option value="">Select size</option>
                                    {sizes[formData.category].map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="form-field">N/A</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select gender</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Discount (%)</label>
                            <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>SEO Title</label>
                            <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>SEO Description</label>
                            <textarea name="seoDescription" value={formData.seoDescription} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>SEO Keywords</label>
                            <input type="text" name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Images</label>
                            <input type="file" name="images" multiple onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <button className="submit-button" onClick={handleSubmit}>{productToEdit ? 'Update Product' : 'Submit Product'}</button>
            </div>
        </div>
    );
};

export default Products;
