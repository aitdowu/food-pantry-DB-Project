import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodItems = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all food items
    const fetchFoodItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/food-items');
            setFoodItems(response.data);
        } catch (error) {
            console.error("Error fetching food items:", error);
            setError("Failed to fetch food items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoodItems();
    }, []);

    // Add or update food item
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !quantity) {
            alert("Please fill in both fields.");
            return;
        }
        try {
            if (editingId) {
                await axios.put(`/food-items/${editingId}`, {
                    description,
                    quantity: parseInt(quantity),
                });
            } else {
                await axios.post('/food-items', {
                    description,
                    quantity: parseInt(quantity),
                });
            }
            setDescription('');
            setQuantity('');
            setEditingId(null);
            fetchFoodItems();
        } catch (error) {
            console.error("Error adding/updating food item:", error);
        }
    };

    // Delete a food item
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/food-items/${id}`);
            fetchFoodItems();
        } catch (error) {
            console.error("Error deleting food item:", error);
        }
    };

    // Start editing a food item
    const handleEdit = (item) => {
        setDescription(item.description);
        setQuantity(item.quantity);
        setEditingId(item.food_id);
    };

    return (
        <div>
            <h1>Food Items</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button type="submit">{editingId ? 'Update' : 'Add'} Item</button>
            </form>
            <ul>
                {foodItems.map((item) => (
                    <li key={item.food_id}>
                        {item.description} (Quantity: {item.quantity}){' '}
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.food_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodItems;