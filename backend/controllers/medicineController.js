const Medicine = require('../models/Medicine');

// Get all medicines
const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new medicine
const addMedicine = async (req, res) => {
    const { name, quantity, expiryDate, location, reorderThreshold } = req.body; // Include reorderThreshold
    try {
        const newMedicine = new Medicine({ name, quantity, expiryDate, location, reorderThreshold }); // Add it here
        await newMedicine.save();
        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMedicine = async (req, res) => {
    const { id } = req.params;
    try {
        await Medicine.findByIdAndDelete(id);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkReplenishment = async (req, res) => {
    try {
        const lowStockMedicines = await Medicine.find({ quantity: { $lt: mongoose.Types.Decimal128(req.query.threshold) }});
        if (lowStockMedicines.length > 0) {
            res.json(lowStockMedicines);
        } else {
            res.json({ message: 'No medicines require replenishment at this time.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getExpiringMedicines = async (req, res) => {
    const days = parseInt(req.query.days) || 30; // Default to 30 days
    const currentDate = new Date();
    const expiryDateThreshold = new Date();
    expiryDateThreshold.setDate(currentDate.getDate() + days);

    try {
        const expiringMedicines = await Medicine.find({ expiryDate: { $lt: expiryDateThreshold } });
        res.json(expiringMedicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMedicines, addMedicine, deleteMedicine,checkReplenishment, getExpiringMedicines };
