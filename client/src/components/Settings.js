import React, { useState } from 'react';
import './Settings.css'; // Import your styles

const Settings = () => {
    const [settings, setSettings] = useState({
        notifications: true,
        theme: 'light', // options can be 'light' or 'dark'
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle settings submission (e.g., save to API or local storage)
        console.log('Settings saved:', settings);
    };

    return (
        <div className="settings">
            <h2>Settings</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={settings.notifications}
                            onChange={handleChange}
                        />
                        Enable Notifications
                    </label>
                </div>
                <div>
                    <label>
                        Theme:
                        <select
                            name="theme"
                            value={settings.theme}
                            onChange={handleChange}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;
