import React from 'react';
import './HelpSupport.css'; // Import your styles

const HelpSupport = () => {
    return (
        <div className="help-support">
            <h2>Help & Support</h2>
            <div className="documentation">
                <h3>Documentation</h3>
                <p>
                    For detailed documentation on how to use the application,
                    please refer to our <a href="/documentation">user guide</a>.
                </p>
            </div>
            <div className="contact-support">
                <h3>Contact Support</h3>
                <p>If you have any issues or need assistance, please contact our support team:</p>
                <ul>
                    <li>Email: support@example.com</li>
                    <li>Phone: (123) 456-7890</li>
                </ul>
            </div>
        </div>
    );
};

export default HelpSupport;
