import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Analytics.css'; // Import your styles

const Analytics = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/analytics'); // Update with your API endpoint
            setReports(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reports:', error);
            setLoading(false);
        }
    };

    return (
        <div className="analytics">
            <h2>Analytics Dashboard</h2>
            {loading ? (
                <p>Loading reports...</p>
            ) : (
                <div>
                    <h3>Insights</h3>
                    <ul>
                        {reports.map((report, index) => (
                            <li key={index}>
                                <strong>{report.title}</strong>: {report.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Analytics;
