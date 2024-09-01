import React from 'react';
import { Navigate } from 'react-router-dom';

// AdminRoute component to protect admin routes
const AdminRoute = ({ children }) => {
    // Logic to determine if the user is an admin
    // For example, check the user's role stored in localStorage or a context
    const userRole = localStorage.getItem('userRole'); // Adjust based on your authentication logic

    // Check if the userRole is 'admin'
    if (userRole !== 'admin') {
        // Redirect to the login page or another route if not an admin
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;
