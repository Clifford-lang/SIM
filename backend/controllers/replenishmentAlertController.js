const Medicine = require('../models/Medicine');

// Get low-stock medicines based on reorderThreshold
const getReplenishmentAlerts = async (req, res) => {
    try {
        const lowStockMedicines = await Medicine.find({ quantity: { $lt: mongoose.Types.Decimal128(req.query.threshold) } });
        res.json(lowStockMedicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReplenishmentAlerts };
