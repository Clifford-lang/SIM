import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedicineList from './components/MedicineList';
import ReplenishmentAlerts from './components/ReplenishmentAlerts'; // Correct spelling and casing
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import EmergencyStockpiling from './components/EmergencyStockpiling';
import ExpiryTracking from './components/ExpiryTracking';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import UserManagement from './components/UserManagement';
import HelpSupport from './components/HelpSupport';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <div className="main-content">
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/medicines" element={<MedicineList />} />
                            <Route path="/replenishment-alerts" element={<ReplenishmentAlerts />} />
                            <Route path="/emergency-stockpiling" element={<EmergencyStockpiling />} />
                            <Route path="/expiry-tracking" element={<ExpiryTracking />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/user-management" element={<UserManagement />} />
                            <Route path="/help-support" element={<HelpSupport />} />
                            {/* Add more routes as needed */}
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
