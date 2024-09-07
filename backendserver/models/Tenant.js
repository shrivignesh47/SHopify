const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // For generating unique template IDs

const TemplateSchema = new mongoose.Schema({
    templateId: { 
        type: String, 
        required: true, 
        unique: true, 
        default: () => uuidv4() // Generate a unique ID by default
    },
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    themeColor: { 
        type: String, 
        required: true 
    },
    logo: { 
        type: String // Base64 encoded image or URL
    },
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware to update the `updatedAt` field on save
TemplateSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = TemplateSchema;
