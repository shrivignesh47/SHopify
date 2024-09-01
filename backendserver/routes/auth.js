const express = require('express');
const { register, login, getAllUsers, deleteUser, updateUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Route to get all users (admin protected)
router.get('/users', authMiddleware, isAdmin, getAllUsers);

// Route to delete a user by ID (admin protected)
router.delete('/users/:id', authMiddleware, isAdmin, deleteUser);

// Route to update a user by ID (admin protected)
router.put('/users/:id', authMiddleware, isAdmin, updateUser);

module.exports = router;
