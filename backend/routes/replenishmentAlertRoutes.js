const express = require('express');
const { getReplenishmentAlerts } = require('../controllers/replenishmentAlertController');
const router = express.Router();

router.get('/', getReplenishmentAlerts);

module.exports = router;
