
const Treatment = require('../models/treatment.model');
const Concern = require('../models/concern.model');
const mongoose = require('mongoose');

exports.createTreatment = async (req, res) => {
    try{
        const { name, description, concerns } = req.body;
        const newTreatment = new Treatment({
            name,
            description,
            concerns: concerns.map(concernId =>new mongoose.Types.ObjectId(concernId))
        });

        await newTreatment.save();

        // Update the concerns to include this treatment
        if (concerns && concerns.length > 0) {
            await Concern.updateMany(
                { _id: { $in: concerns } },
                { $addToSet: { treatments: newTreatment._id } }
            );
        }

        res.status(201).json({ message: "Treatment created successfully", treatment: newTreatment });
    }
    catch (error) {
        console.error("Error creating treatment:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

exports.getAllTreatments = async (req, res) => { 
    try {
        const treatments = await Treatment.find().populate('concerns', 'name description');
        res.status(200).json({allTreatements:treatments});
    } catch (error) {
        console.error("Error fetching treatments:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}