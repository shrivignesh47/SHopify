import { jwtDecode } from 'jwt-decode'; // Correct import

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token) : null; // Use named import here
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const isAdmin = () => {
    const user = getUser();
    return user && user.role === 'admin';
};
