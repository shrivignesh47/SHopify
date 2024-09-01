// src/components/AdminDashboard.js
import React, { useState } from 'react';
import './AdminDashboard.css'; // Ensure this CSS file is in your project
import UserDetails from './UserDetails'; // Import the UserDetails component
import Settings from './Settings'; // Import the Settings component
import Reports from './Reports'; // Import the Reports component
import AdminNavbar from './AdminNavbar'; // Import AdminNavbar component
import AdminSidebar from './AdminSidebar'; // Import AdminSidebar component

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prevState => !prevState);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UserDetails />;
            case 'settings':
                return <Settings />;
            case 'reports':
                return <Reports />;
            default:
                return <UserDetails />;
        }
    };

    return (
        <div className="admin-dashboard-container">
            <AdminNavbar 
                toggleSidebar={toggleSidebar} 
                isSidebarCollapsed={isSidebarCollapsed} 
            />
            <div className="admin-main-content">
                <AdminSidebar 
                    setActiveTab={setActiveTab} 
                    activeTab={activeTab} 
                    isCollapsed={isSidebarCollapsed} 
                />
                <div className="admin-content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
