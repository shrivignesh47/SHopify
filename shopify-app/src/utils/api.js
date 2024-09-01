import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    }
});

export const fetchCompanies = async () => {
    try {
        const response = await api.get('/admin/companies');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCompanyDetails = async (id) => {
    try {
        const response = await api.get(`/admin/company/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCompany = async (id) => {
    try {
        const response = await api.delete(`/admin/company/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCompany = async (id, data) => {
    try {
        const response = await api.put(`/admin/company/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
