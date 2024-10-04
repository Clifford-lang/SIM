import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagement.css'; // Import your styles

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({ name: '', role: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', newUser);
            fetchUsers(); // Refresh the user list
            setNewUser({ name: '', role: '' }); // Clear the form
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            fetchUsers(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                    placeholder="User Name"
                    required
                />
                <select
                    name="role"
                    value={newUser.role}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                </select>
                <button type="submit">Add User</button>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            {user.name} - Role: {user.role}
                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserManagement;
