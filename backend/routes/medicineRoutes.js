const express = require('express');
const { 
    getMedicines, 
    addMedicine, 
    deleteMedicine, 
    checkReplenishment, 
    getExpiringMedicines 
} = require('../controllers/medicineController');
const router = express.Router();

router.get('/', getMedicines);
router.post('/', addMedicine);
router.delete('/:id', deleteMedicine);
router.get('/expiring-medicines', getExpiringMedicines); // Make sure this route is defined

// Optional: route to check replenishment based on threshold
router.get('/replenishment-check', checkReplenishment); // Add this if you have a replenishment check

module.exports = router;
