import React, { useState, useEffect } from 'react';
import './UserDashboard.css'; // Ensure you have this CSS file in your project
import UserNavbar from './UserNavbar'; // Import the UserNavbar component
import UserSidebar from './UserSidebar'; // Import the UserSidebar component
import Products from './Products'; // Import the Products component
import Profile from './Profile'; // Import the Profile component
import Settings from './Settings'; // Import the Settings component
import Subdomain from './Subdomain'; // Import the Subdomain component
import Template from './Template';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch username from local storage or API
        const fetchUsername = () => {
            // Example: Fetch from local storage or an API
            const storedUsername = localStorage.getItem('username') || 'Guest';
            setUsername(storedUsername);
        };

        fetchUsername();
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <Profile />;
            case 'settings':
                return <Settings />;
            case 'products':
                return <Products />;
            case 'Template':
                return <Template />;
            default:
                return <Profile />;
        }
    };

    const handleSidebarToggle = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`user-dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <UserNavbar onToggleSidebar={handleSidebarToggle} username={username} />
            <div className="user-dashboard-main-content">
                <UserSidebar setActiveTab={setActiveTab} activeTab={activeTab} isCollapsed={isSidebarCollapsed} />
                <div className="user-dashboard-content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
