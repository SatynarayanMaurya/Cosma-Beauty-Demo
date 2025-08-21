const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  concerns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Concern" }],
  packages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Package" }]
});

module.exports =  mongoose.model("Treatment", treatmentSchema);
