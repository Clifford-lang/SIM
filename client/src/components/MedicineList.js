import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MedicineList.css';
import AddMedicine from './AddMedicine';
import EditMedicine from './EditMedicine';

const MedicineList = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(null); // State for error handling
    const [editingMedicine, setEditingMedicine] = useState(null);

    const fetchMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/medicines');
            setMedicines(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching medicines:', error);
            setError('Failed to fetch medicines.'); // Set an error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, [refresh]);

    const handleMedicineAdded = () => {
        setRefresh((prev) => !prev); // Toggle to refresh the list
    };

    const deleteMedicine = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/medicines/${id}`);
            handleMedicineAdded(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting medicine:', error);
            setError('Failed to delete medicine.'); // Set an error message
        }
    };

    const handleEditMedicine = (medicine) => {
        setEditingMedicine(medicine);
    };

    return (
        <div className="medicine-list">
            <h2>Medicine Inventory</h2>
            <AddMedicine onMedicineAdded={handleMedicineAdded} />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p> // Display error message
            ) : (
                <ul>
                    {medicines.map((medicine) => (
                        <li key={medicine._id}>
                            {medicine.name} - {medicine.quantity}
                            <button onClick={() => handleEditMedicine(medicine)}>Edit</button>
                            <button onClick={() => deleteMedicine(medicine._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            {editingMedicine && (
                <EditMedicine 
                    medicine={editingMedicine} 
                    onMedicineUpdated={handleMedicineAdded}
                    onCancel={() => setEditingMedicine(null)} 
                />
            )}
        </div>
    );
};

export default MedicineList;
