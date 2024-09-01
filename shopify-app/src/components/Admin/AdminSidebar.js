// src/components/AdminSidebar.js
import React from 'react';
import { FaUsers, FaCog, FaChartBar } from 'react-icons/fa';
import './AdminSidebar.css';

const AdminSidebar = ({ setActiveTab, activeTab, isCollapsed }) => {
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <ul className="sidebar-links">
                <li className={activeTab === 'users' ? 'active' : ''} onClick={() => handleTabChange('users')}>
                    <FaUsers className="sidebar-icon" />
                    <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Users</span>
                </li>
                <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => handleTabChange('settings')}>
                    <FaCog className="sidebar-icon" />
                    <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Settings</span>
                </li>
                <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => handleTabChange('reports')}>
                    <FaChartBar className="sidebar-icon" />
                    <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Reports</span>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
