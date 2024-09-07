// src/components/Settings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

const Settings = () => {
    const [companyDetails, setCompanyDetails] = useState({
        companyName: '',
        address: '',
        gstin: '',
        contactEmail: '',
        contactPhone: '',
    });

    const [userSettings, setUserSettings] = useState({
        theme: 'light',
        notifications: true,
    });

    const [isEditingCompany, setIsEditingCompany] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);

    // Function to get the JWT token from local storage
    const getToken = () => {
        return localStorage.getItem('token'); // Adjust 'token' to whatever key you use
    };

    useEffect(() => {
        const fetchSettings = async () => {
            const token = getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const companyResponse = await axios.get('/api/settings/company-details', config);
                setCompanyDetails(companyResponse.data);

                const userResponse = await axios.get('/api/settings/user-settings', config);
                setUserSettings(userResponse.data);
            } catch (err) {
                console.error('Error fetching settings', err);
            }
        };
        fetchSettings();
    }, []);

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        setCompanyDetails({ ...companyDetails, [name]: value });
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserSettings({ ...userSettings, [name]: value });
    };

    const handleCompanySubmit = async (e) => {
        e.preventDefault();
        const token = getToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            await axios.post('/api/settings/company-details', companyDetails, config);
            alert('Company details updated successfully');
            setIsEditingCompany(false);
        } catch (err) {
            console.error('Error updating company details', err);
            alert('Failed to update company details');
        }
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            await axios.post('/api/settings/user-settings', userSettings, config);
            alert('User settings updated successfully');
            setIsEditingUser(false);
        } catch (err) {
            console.error('Error updating user settings', err);
            alert('Failed to update user settings');
        }
    };

    return (
        <div className="settings-page">
            <main className="settings-content">
                <section id="company-details" className="settings-section">
                    <h3>Company Details</h3>
                    <div className="settings-card">
                        {!isEditingCompany ? (
                            <div className="settings-display">
                                <p><strong>Company Name:</strong> {companyDetails.companyName}</p>
                                <p><strong>Address:</strong> {companyDetails.address}</p>
                                <p><strong>GSTIN:</strong> {companyDetails.gstin}</p>
                                <p><strong>Contact Email:</strong> {companyDetails.contactEmail}</p>
                                <p><strong>Contact Phone:</strong> {companyDetails.contactPhone}</p>
                                <button className="edit-button" onClick={() => setIsEditingCompany(true)}>Edit</button>
                            </div>
                        ) : (
                            <form onSubmit={handleCompanySubmit} className="settings-form">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={companyDetails.companyName}
                                        onChange={handleCompanyChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={companyDetails.address}
                                        onChange={handleCompanyChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>GSTIN</label>
                                    <input
                                        type="text"
                                        name="gstin"
                                        value={companyDetails.gstin}
                                        onChange={handleCompanyChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact Email</label>
                                    <input
                                        type="email"
                                        name="contactEmail"
                                        value={companyDetails.contactEmail}
                                        onChange={handleCompanyChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact Phone</label>
                                    <input
                                        type="text"
                                        name="contactPhone"
                                        value={companyDetails.contactPhone}
                                        onChange={handleCompanyChange}
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="save-button">Save</button>
                                    <button type="button" className="cancel-button" onClick={() => setIsEditingCompany(false)}>Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </section>

                <section id="user-settings" className="settings-section">
                    <h3>User Settings</h3>
                    <div className="settings-card">
                        {!isEditingUser ? (
                            <div className="settings-display">
                                <p><strong>Theme:</strong> {userSettings.theme}</p>
                                <p><strong>Notifications:</strong> {userSettings.notifications ? 'Enabled' : 'Disabled'}</p>
                                <button className="edit-button" onClick={() => setIsEditingUser(true)}>Edit</button>
                            </div>
                        ) : (
                            <form onSubmit={handleUserSubmit} className="settings-form">
                                <div className="form-group">
                                    <label>Theme</label>
                                    <select name="theme" value={userSettings.theme} onChange={handleUserChange} required>
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Notifications</label>
                                    <input
                                        type="checkbox"
                                        name="notifications"
                                        checked={userSettings.notifications}
                                        onChange={() => setUserSettings({ ...userSettings, notifications: !userSettings.notifications })}
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="save-button">Save</button>
                                    <button type="button" className="cancel-button" onClick={() => setIsEditingUser(false)}>Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Settings;
