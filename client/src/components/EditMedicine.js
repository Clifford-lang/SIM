import React, { useState } from 'react';
import axios from 'axios';

const EditMedicine = ({ medicine, onMedicineUpdated, onCancel }) => {
    const [name, setName] = useState(medicine.name);
    const [quantity, setQuantity] = useState(medicine.quantity);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/medicines/${medicine._id}`, { name, quantity });
            onMedicineUpdated(); // Refresh the medicine list
            onCancel(); // Close the edit form
        } catch (error) {
            console.error('Error updating medicine:', error);
        }
    };

    return (
        <div>
            <h3>Edit Medicine</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </label>
                <label>
                    Quantity:
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                    />
                </label>
                <button type="submit">Update Medicine</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditMedicine;
