import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const ReplenishmentAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [threshold, setThreshold] = useState(0); // Default threshold

    const fetchReplenishmentAlerts = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/replenishment-alerts?threshold=${threshold}`);
            setAlerts(response.data);
        } catch (error) {
            console.error('Error fetching replenishment alerts:', error);
        }
    }, [threshold]); // Dependency on threshold

    useEffect(() => {
        fetchReplenishmentAlerts();
    }, [fetchReplenishmentAlerts]); // Only call fetchReplenishmentAlerts

    return (
        <div>
            <h2>Replenishment Alerts</h2>
            <div>
                <label>Set Threshold:</label>
                <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                />
                <button onClick={fetchReplenishmentAlerts}>Check Alerts</button>
            </div>
            <ul>
                {alerts.map((alert) => (
                    <li key={alert._id}>
                        {alert.name} - Low Stock: {alert.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReplenishmentAlerts;
