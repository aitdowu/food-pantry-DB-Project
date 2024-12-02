import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donors = () => {
    const [donors, setDonors] = useState([]);
    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all donors
    const fetchDonors = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/donors');
            setDonors(response.data);
        } catch (error) {
            console.error("Error fetching donors:", error);
            setError("Failed to fetch donors.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    // Add or update donor
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            alert("Please enter a name.");
            return;
        }
        try {
            if (editingId) {
                await axios.put(`/donors/${editingId}`, {
                    name,
                    contact_info: contactInfo,
                });
            } else {
                await axios.post('/donors', {
                    name,
                    contact_info: contactInfo,
                });
            }
            setName('');
            setContactInfo('');
            setEditingId(null);
            fetchDonors();
        } catch (error) {
            console.error("Error adding/updating donor:", error);
        }
    };

    // Delete a donor
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/donors/${id}`);
            fetchDonors();
        } catch (error) {
            console.error("Error deleting donor:", error);
        }
    };

    // Start editing a donor
    const handleEdit = (donor) => {
        setName(donor.name);
        setContactInfo(donor.contact_info);
        setEditingId(donor.donor_id);
    };

    return (
        <div>
            <h1>Donors</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Contact Info"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                />
                <button type="submit">{editingId ? 'Update' : 'Add'} Donor</button>
            </form>
            <ul>
                {donors.map((donor) => (
                    <li key={donor.donor_id}>
                        {donor.name} ({donor.contact_info})
                        <button onClick={() => handleEdit(donor)}>Edit</button>
                        <button onClick={() => handleDelete(donor.donor_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Donors;