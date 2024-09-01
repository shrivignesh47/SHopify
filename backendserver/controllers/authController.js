const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        const payload = { _id: user._id, name: user.name, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, role: user.role });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const payload = { _id: user._id, name: user.name, role: user.role, createdAt: user.createdAt };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: user.role, createdAt: user.createdAt });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        // Optionally handle password update separately if it's being updated
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { createDatabase, getDatabaseUri } = require('../utils/dbutilits');
// require('dotenv').config();

// exports.register = async (req, res) => {
//     const { name, email, password, role = 'user' } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ error: 'User already exists' });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         user = new User({ name, email, password: hashedPassword, role });
//         await user.save();

//         // Create a new database for the user
//         await createDatabase(user._id.toString());

//         const payload = { _id: user._id, name: user.name, role: user.role };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({ token, role: user.role });
//     } catch (err) {
//         console.error('Error registering user:', err);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         const payload = { _id: user._id, name: user.name, role: user.role, createdAt: user.createdAt };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.json({ token, role: user.role, createdAt: user.createdAt });
//     } catch (err) {
//         console.error('Error logging in user:', err);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         await User.findByIdAndDelete(userId);
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// exports.updateUser = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const updates = req.body;

//         // Optionally handle password update separately if it's being updated
//         if (updates.password) {
//             const salt = await bcrypt.genSalt(10);
//             updates.password = await bcrypt.hash(updates.password, salt);
//         }

//         const user = await User.findByIdAndUpdate(userId, updates, { new: true });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

