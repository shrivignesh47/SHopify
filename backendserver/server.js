// const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// const { createSubdomain } = require('./utils/subdomainUtils'); // Ensure this utility is implemented
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(passport.initialize());

// // Passport Config
// require('./config/passport')(passport);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/products', require('./routes/products')); // Add this line for product routes

// // Handle dynamic subdomains
// app.use((req, res, next) => {
//     const host = req.headers.host;
//     const domainParts = host.split('.');
//     if (domainParts.length > 2 && domainParts[0] !== 'www') {
//         const subdomain = domainParts[0];
//         req.tenant = subdomain; // Add tenant to the request object
//         createSubdomain(subdomain); // Optional: Create tenant-specific resources
//     }
//     next();
// });

// // Serve frontend

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createSubdomain, getDatabaseUri } = require('./utils/subdomainUtils'); // Ensure these utilities are implemented
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB (initial connection, tenant-specific connections will be created as needed)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Middleware to handle dynamic subdomains
app.use(async (req, res, next) => {
    const host = req.headers.host;
    const domainParts = host.split('.');
    
    if (domainParts.length > 2 && domainParts[0] !== 'www') {
        const subdomain = domainParts[0];
        req.tenant = subdomain;

        // Set the database connection for the tenant
        const tenantDbUri = getDatabaseUri(subdomain);
        mongoose.createConnection(tenantDbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`Connected to tenant database: ${subdomain}`);
            next();
        }).catch(err => {
            console.error(`Error connecting to tenant database: ${err}`);
            res.status(500).json({ error: 'Error connecting to tenant database' });
        });
    } else {
        next();
    }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products')); // Ensure this is updated to handle tenant-specific data if necessary

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
