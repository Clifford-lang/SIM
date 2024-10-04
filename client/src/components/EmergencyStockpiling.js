// src/components/EmergencyStockpiling.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmergencyStockpiling = () => {
    const [stocks, setStocks] = useState([]);
    const [medicineId, setMedicineId] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [restockThreshold, setRestockThreshold] = useState(0);

    const fetchEmergencyStocks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/emergency-stock');
            setStocks(response.data);
        } catch (error) {
            console.error('Error fetching emergency stocks:', error);
        }
    };

    useEffect(() => {
        fetchEmergencyStocks();
    }, []);

    const handleAddStock = async () => {
        try {
            await axios.post('http://localhost:5000/api/emergency-stock', { medicineId, quantity, restockThreshold });
            fetchEmergencyStocks(); // Refresh the list
        } catch (error) {
            console.error('Error adding emergency stock:', error);
        }
    };

    const deleteStock = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/emergency-stock/${id}`);
            fetchEmergencyStocks(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting emergency stock:', error);
        }
    };

    return (
        <div>
            <h2>Emergency Stockpiling</h2>
            <div>
                <input
                    type="text"
                    placeholder="Medicine ID"
                    value={medicineId}
                    onChange={(e) => setMedicineId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={handleAddStock}>Add Emergency Stock</button>
            </div>
            <ul>
                {stocks.map((stock) => (
                    <li key={stock._id}>
                        Medicine: {stock.medicineId.name} - Quantity: {stock.quantity} - Threshold: {stock.restockThreshold}
                        <button onClick={() => deleteStock(stock._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmergencyStockpiling;
