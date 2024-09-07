const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // For generating unique template IDs

const TemplateSchema = new mongoose.Schema({
    templateId: { 
        type: String, 
        required: true, 
        unique: true, 
        default: uuidv4 // Generate a unique ID by default
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
        type: String, // Base64 encoded image or URL
        validate: {
            validator: function(v) {
                // Example validation for base64 (you can adjust the regex as needed)
                return /^(data:image\/[a-zA-Z]+;base64,)/.test(v) || /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(v);
            },
            message: 'Invalid logo URL or base64 encoded image'
        }
    },
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = TemplateSchema;
