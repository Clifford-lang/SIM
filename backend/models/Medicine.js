const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    reorderThreshold: {
        type: Number,
        required: true,   // Define the minimum stock level before a replenishment alert is triggered
    },
});

const Medicine = mongoose.model('Medicine', MedicineSchema);

module.exports = Medicine;
