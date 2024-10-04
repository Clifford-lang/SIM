import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/medicines">Medicine Inventory</Link></li>
                <li><Link to="/emergency-stockpiling">Emergency Stockpiling</Link></li>
                <li><Link to="/replenishment-alerts">Replenishment Alerts</Link></li>
                <li><Link to="/expiry-tracking">Expiry Date Tracking</Link></li>
                <li><Link to="/analytics">Analytics</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/user-management">User Management</Link></li>
                <li><Link to="/help-support">Help/Support</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
