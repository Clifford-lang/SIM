import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [totalMedicines, setTotalMedicines] = useState(0);
    const [lowStock, setLowStock] = useState(0);
    const [expired, setExpired] = useState(0);
    const [upcomingExpirations, setUpcomingExpirations] = useState(0);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Function to fetch real-time data from backend
        const fetchData = async () => {
            try {
                const medicinesResponse = await fetch('/api/medicines'); // Fetch total medicines
                const lowStockResponse = await fetch('/api/medicines/replenishment-check'); // Low stock
                const expiredResponse = await fetch('/api/medicines/expiring-medicines?days=0'); // Expired medicines
                const upcomingResponse = await fetch('/api/medicines/expiring-medicines?days=30'); // Upcoming expirations

                const medicinesData = await medicinesResponse.json();
                const lowStockData = await lowStockResponse.json();
                const expiredData = await expiredResponse.json();
                const upcomingData = await upcomingResponse.json();

                // Update state with fetched data
                setTotalMedicines(medicinesData.length);
                setLowStock(lowStockData.length);
                setExpired(expiredData.length);
                setUpcomingExpirations(upcomingData.length);

                // Generate alerts based on fetched data
                const generatedAlerts = [];
                if (lowStockData.length > 0) generatedAlerts.push('Some medicines are low on stock!');
                if (expiredData.length > 0) generatedAlerts.push('There are expired medicines!');
                if (upcomingData.length > 0) generatedAlerts.push('Some medicines will expire soon!');
                setAlerts(generatedAlerts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data every 10 seconds
        const intervalId = setInterval(fetchData, 10000); // Update every 10 seconds

        // Initial fetch
        fetchData();

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="metrics">
                <div className="metric">
                    <h3>Total Medicines</h3>
                    <p>{totalMedicines}</p>
                </div>
                <div className="metric">
                    <h3>Low Stock Alerts</h3>
                    <p>{lowStock}</p>
                </div>
                <div className="metric">
                    <h3>Expired Medicines</h3>
                    <p>{expired}</p>
                </div>
                <div className="metric">
                    <h3>Upcoming Expirations</h3>
                    <p>{upcomingExpirations}</p>
                </div>
            </div>
            <div className="alerts">
                <h3>Alerts</h3>
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index}>{alert}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
