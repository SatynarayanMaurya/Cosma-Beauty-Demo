const mongoose = require('mongoose');
const Package = require('../models/package.model');
const Treatment = require('../models/treatment.model');

exports.createPackage = async (req, res) => {
    try {
        const { name, price, description, treatments } = req.body;
        const newPackage = new Package({
            name,
            price,
            description,
            treatments: treatments.map(treatmentId => new mongoose.Types.ObjectId(treatmentId))
        });

        await newPackage.save();

        // Update the treatments to include this package
        if (treatments && treatments.length > 0) {
            await Treatment.updateMany(
                { _id: { $in: treatments } },
                { $addToSet: { packages: newPackage._id } }
            );
        }

        res.status(201).json({ message: "Package created successfully",  });
    } catch (error) {
        console.error("Error creating package:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

exports.getAllPackages = async (req, res) => {
    try {
        // const packages = await Package.find().populate('treatments');
        const packages = await Package.find()
        .populate({
            path: 'treatments',
            populate: {
            path: 'concerns',   // field inside treatments schema
            }
        });

        res.status(200).json({ allPackages: packages });
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}