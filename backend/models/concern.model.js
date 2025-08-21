// models/Concern.js
const mongoose = require('mongoose');
const concernSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String }, // optional: extra info
  treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Treatment" }]
});

module.exports =  mongoose.model("Concern", concernSchema);
