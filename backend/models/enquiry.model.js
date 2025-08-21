const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  concern: { type: mongoose.Schema.Types.ObjectId, ref: "Concern" },
  treatment: { type: mongoose.Schema.Types.ObjectId, ref: "Treatment" },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model("Enquiry", enquirySchema);
