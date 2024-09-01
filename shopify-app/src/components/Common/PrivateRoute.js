// components/Common/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // or however you manage auth state

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
