import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Distributions = () => {
    const [distributions, setDistributions] = useState([]);
    const [distributionDate, setDistributionDate] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [recipients, setRecipients] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all distributions and recipients
    const fetchDistributions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/distributions');
            setDistributions(response.data);
        } catch (error) {
            console.error("Error fetching distributions:", error);
            setError("Failed to fetch distributions.");
        } finally {
            setLoading(false);
        }
    };

    const fetchRecipients = async () => {
        try {
            const response = await axios.get('/recipients');
            setRecipients(response.data);
        } catch (error) {
            console.error("Error fetching recipients:", error);
        }
    };

    useEffect(() => {
        fetchDistributions();
        fetchRecipients();
    }, []);

    // Add or update distribution
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!distributionDate || !recipientId) {
            alert("Please select a date and a recipient.");
            return;
        }
        try {
            if (editingId) {
                await axios.put(`/distributions/${editingId}`, {
                    distribution_date: distributionDate,
                    recipient_id: parseInt(recipientId),
                });
            } else {
                await axios.post('/distributions', {
                    distribution_date: distributionDate,
                    recipient_id: parseInt(recipientId),
                });
            }
            setDistributionDate('');
            setRecipientId('');
            setEditingId(null);
            fetchDistributions();
        } catch (error) {
            console.error("Error adding/updating distribution:", error);
        }
    };

    // Delete a distribution
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/distributions/${id}`);
            fetchDistributions();
        } catch (error) {
            console.error("Error deleting distribution:", error);
        }
    };

    // Start editing a distribution
    const handleEdit = (distribution) => {
        setDistributionDate(distribution.distribution_date);
        setRecipientId(distribution.recipient_id);
        setEditingId(distribution.distribution_id);
    };

    return (
        <div>
            <h1>Distributions</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={distributionDate}
                    onChange={(e) => setDistributionDate(e.target.value)}
                />
                <select
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                >
                    <option value="">Select Recipient</option>
                    {recipients.map((recipient) => (
                        <option key={recipient.recipient_id} value={recipient.recipient_id}>
                            {recipient.name}
                        </option>
                    ))}
                </select>
                <button type="submit">{editingId ? 'Update' : 'Add'} Distribution</button>
            </form>
            <ul>
                {distributions.map((distribution) => (
                    <li key={distribution.distribution_id}>
                        Date: {distribution.distribution_date.slice(0, 10)}, Recipient: {distribution.recipient_name}
                        <button onClick={() => handleEdit(distribution)}>Edit</button>
                        <button onClick={() => handleDelete(distribution.distribution_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Distributions;