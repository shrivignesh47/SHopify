import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/User/Dashboard';
import Products from './components/User/Products';
import AdminDashboard from './components/Admin/Dashboard';
import ManageCompanies from './components/Admin/MangeCompanies';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminRoute from './components/Common/AdminRoute';
import Preview from './components/User/Preview'; 
function App() {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/products" 
                        element={
                            <PrivateRoute>
                                <Products />
                            </PrivateRoute>
                        } 
                    />

                    <Route 
                    path="/preview" 
                    element={
                        <PrivateRoute>
                            <Preview />
                        </PrivateRoute>
                    } 
                />
                    {/* Admin routes */}
                    <Route 
                        path="/admin/dashboard" 
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        } 
                    />
                    <Route 
                        path="/admin/ManageCompanies" 
                        element={
                            <AdminRoute>
                                <ManageCompanies />
                            </AdminRoute>
                        } 
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
