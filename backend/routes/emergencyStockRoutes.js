const express = require('express');
const { 
    getEmergencyStocks, 
    addEmergencyStock, 
    deleteEmergencyStock 
} = require('../controllers/emergencyStockController'); // Make sure this file exists and has these exports

const router = express.Router();

router.get('/', getEmergencyStocks);
router.post('/', addEmergencyStock);
router.delete('/:id', deleteEmergencyStock);

module.exports = router;
