const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "3 Sessions PRP"
  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: String }, // optional: e.g. "3 months"
  treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Treatment" }]
});

module.exports =  mongoose.model("Package", packageSchema);
