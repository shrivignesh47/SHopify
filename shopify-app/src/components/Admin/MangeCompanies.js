import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [newCompany, setNewCompany] = useState({ name: '' });
    const [editingCompany, setEditingCompany] = useState(null);

    // Fetch companies on component mount
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token
                const response = await axios.get('/api/companies', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setCompanies(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCompanies();
    }, []);

    // Add a new company
    const handleAddCompany = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            const response = await axios.post('/api/companies', newCompany, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCompanies([...companies, response.data]);
            setNewCompany({ name: '' });
        } catch (error) {
            setError(error.message);
        }
    };

    // Update an existing company
    const handleUpdateCompany = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            const response = await axios.put(`/api/companies/${editingCompany._id}`, editingCompany, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCompanies(companies.map(company =>
                company._id === editingCompany._id ? response.data : company
            ));
            setEditingCompany(null);
        } catch (error) {
            setError(error.message);
        }
    };

    // Delete a company
    const handleDeleteCompany = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            await axios.delete(`/api/companies/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCompanies(companies.filter(company => company._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Manage Companies</h2>
            {error && <div className="error-message">{error}</div>}

            {/* Add/Edit Company Form */}
            <form onSubmit={editingCompany ? handleUpdateCompany : handleAddCompany}>
                <input
                    type="text"
                    value={editingCompany ? editingCompany.name : newCompany.name}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (editingCompany) {
                            setEditingCompany({ ...editingCompany, name: value });
                        } else {
                            setNewCompany({ name: value });
                        }
                    }}
                    placeholder="Company Name"
                    required
                />
                <button type="submit">
                    {editingCompany ? 'Update Company' : 'Add Company'}
                </button>
                {editingCompany && (
                    <button type="button" onClick={() => setEditingCompany(null)}>
                        Cancel
                    </button>
                )}
            </form>

            {/* List of Companies */}
            <ul>
                {companies.map(company => (
                    <li key={company._id}>
                        {company.name}
                        <button onClick={() => setEditingCompany(company)}>Edit</button>
                        <button onClick={() => handleDeleteCompany(company._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCompanies;
