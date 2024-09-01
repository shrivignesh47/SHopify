// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import './UserDetails.css';

// const UserDetails = () => {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState('');
//     const [editingUser, setEditingUser] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/auth/users');
//                 console.log('Fetched users:', response.data);
//                 if (Array.isArray(response.data)) {
//                     setUsers(response.data);
//                 } else {
//                     console.error('Expected an array of users');
//                     setError('Unexpected response format');
//                 }
//             } catch (err) {
//                 setError('Error fetching users');
//                 console.error(err);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleDelete = (id) => {
//         confirmAlert({
//             title: 'Confirm Deletion',
//             message: 'Are you sure you want to delete this user?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async () => {
//                         try {
//                             await axios.delete(`http://localhost:3000/api/auth/users/${id}`);
//                             setUsers(users.filter(user => user._id !== id));
//                         } catch (err) {
//                             setError('Error deleting user');
//                             console.error(err);
//                         }
//                     }
//                 },
//                 {
//                     label: 'No',
//                 }
//             ]
//         });
//     };

//     const handleEdit = (user) => {
//         setEditingUser(user);
//         setShowModal(true);
//     };

//     const handleModalClose = () => {
//         setShowModal(false);
//         setEditingUser(null);
//     };

//     const handleSave = () => {
//         confirmAlert({
//             title: 'Confirm Edit',
//             message: 'Are you sure you want to save these changes?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async () => {
//                         try {
//                             await axios.put(`http://localhost:3000/api/auth/users/${editingUser._id}`, editingUser);
//                             setUsers(users.map(user => (user._id === editingUser._id ? editingUser : user)));
//                             handleModalClose();
//                         } catch (err) {
//                             setError('Error updating user');
//                             console.error(err);
//                         }
//                     }
//                 },
//                 {
//                     label: 'No',
//                 }
//             ]
//         });
//     };

//     return (
//         <div className="user-details">
//             <h2>User Details</h2>
//             {error && <div className="error-message">{error}</div>}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Created At</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Array.isArray(users) && users.length > 0 ? (
//                         users.map(user => (
//                             <tr key={user._id}>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.role}</td>
//                                 <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                                 <td>
//                                     <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
//                                     <button onClick={() => handleDelete(user._id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5">No users found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {/* Modal for editing user */}
//             {showModal && (
//                 <div className="modal active">
//                     <div className="modal-content">
//                         <span className="modal-close" onClick={handleModalClose}>&times;</span>
//                         <h2>Edit User</h2>
//                         <div className="modal-body">
//                             <label>Name:</label>
//                             <input
//                                 type="text"
//                                 value={editingUser?.name || ''}
//                                 onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
//                             />
//                             <label>Email:</label>
//                             <input
//                                 type="email"
//                                 value={editingUser?.email || ''}
//                                 onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
//                             />
//                             <label>Role:</label>
//                             <select
//                                 value={editingUser?.role || ''}
//                                 onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
//                             >
//                                 <option value="user">User</option>
//                                 <option value="admin">Admin</option>
//                             </select>
//                         </div>
//                         <div className="modal-footer">
//                             <button onClick={handleSave}>Save</button>
//                             <button onClick={handleModalClose}>Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserDetails;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './UserDetails.css';

const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the JWT token from localStorage
                const response = await axios.get('http://localhost:3000/api/auth/users', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request headers
                    },
                });
                console.log('Fetched users:', response.data);
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error('Expected an array of users');
                    setError('Unexpected response format');
                }
            } catch (err) {
                setError('Error fetching users');
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this user?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const token = localStorage.getItem('token');
                            await axios.delete(`http://localhost:3000/api/auth/users/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                                },
                            });
                            setUsers(users.filter(user => user._id !== id));
                        } catch (err) {
                            setError('Error deleting user');
                            console.error(err);
                        }
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditingUser(null);
    };

    const handleSave = () => {
        confirmAlert({
            title: 'Confirm Edit',
            message: 'Are you sure you want to save these changes?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const token = localStorage.getItem('token');
                            await axios.put(`http://localhost:3000/api/auth/users/${editingUser._id}`, editingUser, {
                                headers: {
                                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                                },
                            });
                            setUsers(users.map(user => (user._id === editingUser._id ? editingUser : user)));
                            handleModalClose();
                        } catch (err) {
                            setError('Error updating user');
                            console.error(err);
                        }
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    return (
        <div className="user-details">
            <h2>User Details</h2>
            {error && <div className="error-message">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
                                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for editing user */}
            {showModal && (
                <div className="modal active">
                    <div className="modal-content">
                        <span className="modal-close" onClick={handleModalClose}>&times;</span>
                        <h2>Edit User</h2>
                        <div className="modal-body">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={editingUser?.name || ''}
                                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                value={editingUser?.email || ''}
                                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            />
                            <label>Role:</label>
                            <select
                                value={editingUser?.role || ''}
                                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleModalClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
