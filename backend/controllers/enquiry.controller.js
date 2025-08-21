const { default: mongoose } = require('mongoose');
const Enquiry = require('../models/enquiry.model');

exports.createEnquiry = async (req, res) => {
  try {
    const {name,email,message,concern,treatment,package} = req.body;
    await Enquiry.create({ name,email,message,concern :new mongoose.Types.ObjectId(concern),treatment:new mongoose.Types.ObjectId(treatment),package:new mongoose.Types.ObjectId(package) })

    res.status(201).json({ message: 'Enquiry created successfully' });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}


exports.getEnquiry = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate('concern treatment package');
    res.status(200).json({allEnquires :enquiries});
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ message:error?.message || 'Internal server error', error: error.message });
  }
}