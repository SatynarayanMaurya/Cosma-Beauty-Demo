// import Concern from '../models/concern.model';
const Concern = require('../models/concern.model');

exports.createConcern = async (req, res) => {
    try{
        const { name, description } = req.body;
        const newConcern = new Concern({
            name,
            description
        });
        await newConcern.save();
        res.status(201).json({message: "Concern created successfully" });
    }
    catch (error) {
        console.error("Error creating concern:", error);
        res.status(500).json({ message:error.message ||  "Internal server error" });
    }
}

exports.getAllConcerns = async (req, res) => {
    try {
        const concerns = await Concern.find().populate('treatments', 'name description');
        res.status(200).json({allConcern : concerns});
    } catch (error) {
        console.error("Error fetching concerns:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}