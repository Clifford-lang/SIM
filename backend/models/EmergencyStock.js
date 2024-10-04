const mongoose = require('mongoose');

const EmergencyStockSchema = new mongoose.Schema({
    medicine: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    threshold: {
        type: Number,
        required: true,  // This indicates when an alert should trigger for low stock
        default: 0       // Default to 0 if you don't have a threshold initially
    },
});

const EmergencyStock = mongoose.model('EmergencyStock', EmergencyStockSchema);

module.exports = EmergencyStock;
