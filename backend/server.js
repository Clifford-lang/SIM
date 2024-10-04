const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');

// Import routes
const emergencyStockRoutes = require('./routes/emergencyStockRoutes');
const medicineRoutes = require('./routes/medicineRoutes'); 
const replenishmentAlertRoutes = require('./routes/replenishmentAlertRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/medicines', medicineRoutes); // Mount medicine routes
app.use('/api/emergency-stock', emergencyStockRoutes);
app.use('/api/replenishment-alerts', replenishmentAlertRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Schedule daily check for replenishment at 8:00 AM
cron.schedule('0 8 * * *', async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/medicines/replenishment-check');
        console.log('Replenishment check results:', response.data);
    } catch (error) {
        console.error('Error during replenishment check:', error.message);
    }
});
