// src/components/AdminNavbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS for confirmAlert
import './AdminNavbar.css';

const AdminNavbar = ({ toggleSidebar, isSidebarCollapsed }) => {
    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = () => {
        confirmAlert({
            title: 'Confirm Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // Remove JWT token from local storage
                        localStorage.removeItem('token');
                        
                        // Redirect to the homepage
                        navigate('/');
                    }
                },
                {
                    label: 'No',
                    // No action needed
                }
            ]
        });
    };

    return (
        <div className="admin-navbar">
            <div className="navbar-left">
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <img src="logo.png" alt="Logo" className="navbar-logo" />
                <h1 className="navbar-title">Admin Dashboard</h1>
            </div>
            <div className="navbar-right">
                <button className="navbar-notification">
                    <FaBell />
                </button>
                <button className="navbar-logout" onClick={handleLogout}>
                    <FaSignOutAlt />
                </button>
            </div>
        </div>
    );
};

export default AdminNavbar;
