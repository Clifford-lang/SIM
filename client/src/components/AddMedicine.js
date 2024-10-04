import React, { useState } from 'react';
import axios from 'axios';
import './AddMedicine.css';

const AddMedicine = ({ onMedicineAdded }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [location, setLocation] = useState('');
    const [reorderThreshold, setReorderThreshold] = useState('');
    const [timeAdded, setTimeAdded] = useState(''); // Updated state for time added

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/medicines', {
                name,
                quantity,
                expiryDate,
                location,
                reorderThreshold,
                timeAdded, // Include time added in the POST request
            });
            // Clear the form after successful submission
            setName('');
            setQuantity('');
            setExpiryDate('');
            setLocation('');
            setReorderThreshold('');
            setTimeAdded(''); // Clear time added
            // Notify the parent component to refresh the list
            onMedicineAdded();
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Medicine</h3>
            <label htmlFor="name">Medicine Name:</label>
            <input
                id="name"
                type="text"
                placeholder="Medicine Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label htmlFor="quantity">Quantity:</label>
            <input
                id="quantity"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />

            <label htmlFor="timeAdded">Time Added:</label>
            <input
                id="timeAdded"
                type="date"
                value={timeAdded}
                onChange={(e) => setTimeAdded(e.target.value)}
                required
            />

            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
            />

            <label htmlFor="location">Location:</label>
            <input
                id="location"
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />

            <label htmlFor="reorderThreshold">Reorder Threshold:</label>
            <input
                id="reorderThreshold"
                type="number"
                placeholder="Reorder Threshold"
                value={reorderThreshold}
                onChange={(e) => setReorderThreshold(e.target.value)}
                required
            />

            <button type="submit">Add Medicine</button>
        </form>
    );
};

export default AddMedicine;
