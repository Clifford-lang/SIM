// controllers/emergencyStockController.js

const EmergencyStock = require('../models/EmergencyStock');

// Fetch all emergency stocks
exports.getEmergencyStocks = async (req, res) => {
    try {
        const stocks = await EmergencyStock.find(); // Fetch stocks from the database
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching emergency stocks', error });
    }
};

// Add new emergency stock
exports.addEmergencyStock = async (req, res) => {
    const { medicine, quantity, threshold } = req.body;

    try {
        const newStock = new EmergencyStock({ medicine, quantity, threshold });
        await newStock.save();
        res.status(201).json(newStock);
    } catch (error) {
        res.status(500).json({ message: 'Error adding new emergency stock', error });
    }
};

// Delete an emergency stock by ID
exports.deleteEmergencyStock = async (req, res) => {
    const { id } = req.params;

    try {
        const stock = await EmergencyStock.findByIdAndDelete(id);
        if (!stock) {
            return res.status(404).json({ message: 'Emergency stock not found' });
        }
        res.status(200).json({ message: `Deleted emergency stock with id ${id}` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting emergency stock', error });
    }
};
