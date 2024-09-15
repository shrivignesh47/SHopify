const path = require('path');
const fs = require('fs');
const connectUserDb = require('../utils/connectUserDb');
const Template = require('../models/Templates'); // Import the Template model

// Upload logo files to the server
const uploadLogo = async (file) => {
    const uploadPath = path.join(__dirname, '../uploads/', file.originalname);
    await fs.promises.writeFile(uploadPath, file.buffer);
    return uploadPath;
};

// Get all templates
const getAllTemplates = async (req, res) => {
    const userId = req.user._id;

    try {
        const userDb = await connectUserDb(userId);
        const TemplateModel = userDb.model('Template', Template.schema);
        const templates = await TemplateModel.find();
        res.status(200).json(templates);
    } catch (err) {
        console.error('Error fetching templates:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new template
const addTemplate = async (req, res) => {
    const userId = req.user._id;

    try {
        const userDb = await connectUserDb(userId);
        const TemplateModel = userDb.model('Template', Template.schema);

        const { templateId, name, themeColor } = req.body;

        const logoPath = req.file ? await uploadLogo(req.file) : '';  // Upload logo if provided

        const newTemplate = new TemplateModel({
            templateId,
            name,
            themeColor,
            logo: logoPath ? fs.readFileSync(logoPath, 'base64') : '', // Convert to base64 if logo exists
        });

        const savedTemplate = await newTemplate.save();
        res.status(201).json({
            message: 'Template added successfully',
            template: savedTemplate
        });
    } catch (err) {
        console.error('Error adding template:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation error', details: err.errors });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

// Get a template by ID
const getTemplateById = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const userDb = await connectUserDb(userId);
        const TemplateModel = userDb.model('Template', Template.schema);
        const template = await TemplateModel.findById(id);

        if (template) {
            res.status(200).json(template);
        } else {
            res.status(404).json({ message: 'Template not found' });
        }
    } catch (err) {
        console.error('Error fetching template by ID:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a template
const updateTemplate = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const userDb = await connectUserDb(userId);
        const TemplateModel = userDb.model('Template', Template.schema);

        const { templateId, name, themeColor } = req.body;

        const logoPath = req.file ? await uploadLogo(req.file) : '';

        const updatedData = {
            templateId,
            name,
            themeColor,
            logo: logoPath ? fs.readFileSync(logoPath, 'base64') : '', // Convert to base64 if logo exists
        };

        const updatedTemplate = await TemplateModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (updatedTemplate) {
            res.status(200).json(updatedTemplate);
        } else {
            res.status(404).json({ message: 'Template not found' });
        }
    } catch (err) {
        console.error('Error updating template:', err);
        res.status(400).json({ message: err.message });
    }
};

// Delete a template
const deleteTemplate = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const userDb = await connectUserDb(userId);
        const TemplateModel = userDb.model('Template', Template.schema);
        const deletedTemplate = await TemplateModel.findByIdAndDelete(id);

        if (deletedTemplate) {
            if (deletedTemplate.logo) {
                const logoPath = path.join(__dirname, '../uploads/', deletedTemplate.logo);
                if (fs.existsSync(logoPath)) {
                    await fs.promises.unlink(logoPath); // Remove logo file if it exists
                }
            }
            res.status(200).json({ message: 'Template deleted successfully' });
        } else {
            res.status(404).json({ message: 'Template not found' });
        }
    } catch (err) {
        console.error('Error deleting template:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllTemplates,
    addTemplate,
    getTemplateById,
    updateTemplate,
    deleteTemplate
};
