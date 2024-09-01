import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Ensure this path is correct
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Import icons from react-icons

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password }); // Log the login attempt

        try {
            const response = await axios.post('/api/auth/login', { email, password });
            console.log('Login response:', response.data); // Log the response from the server

            const { token, role, createdAt } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userCreatedAt', createdAt); // Store createdAt in local storage

            console.log('Stored token, role, and createdAt in local storage:', { token, role, createdAt }); // Log stored values

            if (role === 'admin') {
                console.log('Redirecting to admin dashboard');
                navigate('/admin/dashboard');
            } else {
                console.log('Redirecting to user dashboard');
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
            console.error('Login error:', err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-form-container">
                    <h1>Welcome Back!</h1>
                    <p className="login-subtitle">Sign in to your account</p>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <div className="social-login">
                        <button className="social-button google-button">
                            <FaGoogle className="social-icon" />
                            Login with Google
                        </button>
                        <button className="social-button github-button">
                            <FaGithub className="social-icon" />
                            Login with GitHub
                        </button>
                    </div>
                    <p className="register-link">
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                </div>
            </div>
            <div className="login-image">
                <img src="path/to/your/image.jpg" alt="Login Background" />
            </div>
        </div>
    );
};

export default Login;
