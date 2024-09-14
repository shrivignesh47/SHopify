import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FaBell, FaSignOutAlt } from 'react-icons/fa'; // Import the icons from react-icons
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS for confirmAlert
import './UserNavbar.css'; // Import the CSS file

const UserNavbar = ({ onToggleSidebar, username }) => {
    const handleLogout = () => {
        confirmAlert({
            title: 'Confirm Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // Clear the token from local storage or any other storage
                        localStorage.removeItem('authToken');
                        // Redirect to login page or any other page
                        window.location.href = '/';
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    return (
        <div className="user-navbar">
            <button className="navbar-sidebar-toggle" onClick={onToggleSidebar}>☰</button>
            <img src="/path/to/logo.png" alt="Logo" className="navbar-logo" />
            <div className="navbar-right">
                <span className="navbar-username">{username || 'Guest'}</span>
                <button className="navbar-notification">
                    <FaBell size={24} />
                </button>
                <button className="navbar-logout" onClick={handleLogout}>
                    <FaSignOutAlt size={24} />
                </button>
            </div>
        </div>
    );
};

export default UserNavbar;
