// src/components/ExpiryTracking.js

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './ExpiryTracking.css'; // Import your styles

const ExpiryTracking = () => {
    const [expiringMedicines, setExpiringMedicines] = useState([]);
    const [daysThreshold, setDaysThreshold] = useState(30); // Default threshold for notifications

    const fetchExpiringMedicines = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/expiring-medicines?days=${daysThreshold}`);
            setExpiringMedicines(response.data);
        } catch (error) {
            console.error('Error fetching expiring medicines:', error);
        }
    }, [daysThreshold]);

    useEffect(() => {
        fetchExpiringMedicines();
    }, [fetchExpiringMedicines]);

    return (
        <div className="expiry-tracking"> {/* Add class for styling */}
            <h2>Expiry Date Tracking</h2>
            <div>
                <label>Notify me for medicines expiring in (days):</label>
                <input
                    type="number"
                    value={daysThreshold}
                    onChange={(e) => setDaysThreshold(e.target.value)}
                />
                <button onClick={fetchExpiringMedicines}>Check Expiry</button>
            </div>
            <ul>
                {expiringMedicines.map((medicine) => (
                    <li key={medicine._id}>
                        {medicine.name} - Expiry Date: {new Date(medicine.expiryDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpiryTracking;
