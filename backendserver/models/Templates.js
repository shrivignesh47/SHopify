// models/Template.js
const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  themeColor: { type: String },
  backgroundColor: { type: String },
  navbarColor: { type: String },
  sidebarColor: { type: String },
  logo: { type: String }, // Store as base64 or URL
  pages: [{ type: String }],
  font: { type: String },
  productStyle: { type: String },
  footerDesign: { type: String },
  navbarDesign: { type: String },
  sidebarDesign: { type: String },
  breadcrumbs: [{ type: String }],
  carouselImages: [{ type: String }], // Store as base64 or URL
  deployUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports =  templateSchema;
