import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recipients = () => {
    const [recipients, setRecipients] = useState([]);
    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all recipients
    const fetchRecipients = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/recipients');
            setRecipients(response.data);
        } catch (error) {
            console.error("Error fetching recipients:", error);
            setError("Failed to fetch recipients.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipients();
    }, []);

    // Add or update recipient
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            alert("Please enter a name.");
            return;
        }
        try {
            if (editingId) {
                await axios.put(`/recipients/${editingId}`, {
                    name,
                    contact_info: contactInfo,
                });
            } else {
                await axios.post('/recipients', {
                    name,
                    contact_info: contactInfo,
                });
            }
            setName('');
            setContactInfo('');
            setEditingId(null);
            fetchRecipients();
        } catch (error) {
            console.error("Error adding/updating recipient:", error);
        }
    };

    // Delete a recipient
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/recipients/${id}`);
            fetchRecipients();
        } catch (error) {
            console.error("Error deleting recipient:", error);
        }
    };

    // Start editing a recipient
    const handleEdit = (recipient) => {
        setName(recipient.name);
        setContactInfo(recipient.contact_info);
        setEditingId(recipient.recipient_id);
    };

    return (
        <div>
            <h1>Recipients</h1>
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
                <button type="submit">{editingId ? 'Update' : 'Add'} Recipient</button>
            </form>
            <ul>
                {recipients.map((recipient) => (
                    <li key={recipient.recipient_id}>
                        {recipient.name} ({recipient.contact_info})
                        <button onClick={() => handleEdit(recipient)}>Edit</button>
                        <button onClick={() => handleDelete(recipient.recipient_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipients;