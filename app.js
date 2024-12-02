const express = require("express");
const mysql = require("mysql2");

// Create an Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace with your MySQL username
    password: "nview5050", // Replace with your MySQL password
    database: "food_pantry" // The name of your database
});

// Test the database connection
db.connect(err => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL!");
});

// --- Food_Items CRUD Operations ---

// Create a food item
app.post("/food-items", (req, res) => {
    const { description, quantity } = req.body;
    const query = "INSERT INTO Food_Items (description, quantity) VALUES (?, ?)";
    db.query(query, [description, quantity], (err) => {
        if (err) {
            res.status(500).send("Error adding food item");
        } else {
            res.status(201).send("Food item added successfully");
        }
    });
});

// Read all food items
app.get("/food-items", (req, res) => {
    const query = "SELECT * FROM Food_Items";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send("Error fetching food items");
        } else {
            res.json(results);
        }
    });
});

// Update a food item
app.put("/food-items/:id", (req, res) => {
    const { id } = req.params;
    const { description, quantity } = req.body;
    const query = "UPDATE Food_Items SET description = ?, quantity = ? WHERE food_id = ?";
    db.query(query, [description, quantity, id], (err) => {
        if (err) {
            res.status(500).send("Error updating food item");
        } else {
            res.send("Food item updated successfully");
        }
    });
});

// Delete a food item
app.delete("/food-items/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Food_Items WHERE food_id = ?";
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).send("Error deleting food item");
        } else {
            res.send("Food item deleted successfully");
        }
    });
});

// --- Donors CRUD Operations ---

// Create a donor
app.post("/donors", (req, res) => {
    const { name, contact_info } = req.body;
    const query = "INSERT INTO Donors (name, contact_info) VALUES (?, ?)";
    db.query(query, [name, contact_info], (err) => {
        if (err) {
            res.status(500).send("Error adding donor");
        } else {
            res.status(201).send("Donor added successfully");
        }
    });
});

// Read all donors
app.get("/donors", (req, res) => {
    const query = "SELECT * FROM Donors";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send("Error fetching donors");
        } else {
            res.json(results);
        }
    });
});

// Update a donor
app.put("/donors/:id", (req, res) => {
    const { id } = req.params;
    const { name, contact_info } = req.body;
    const query = "UPDATE Donors SET name = ?, contact_info = ? WHERE donor_id = ?";
    db.query(query, [name, contact_info, id], (err) => {
        if (err) {
            res.status(500).send("Error updating donor");
        } else {
            res.send("Donor updated successfully");
        }
    });
});

// Delete a donor
app.delete("/donors/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Donors WHERE donor_id = ?";
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).send("Error deleting donor");
        } else {
            res.send("Donor deleted successfully");
        }
    });
});

// --- Recipients CRUD Operations ---

// Create a recipient
app.post("/recipients", (req, res) => {
    const { name, contact_info } = req.body;
    const query = "INSERT INTO Recipients (name, contact_info) VALUES (?, ?)";
    db.query(query, [name, contact_info], (err) => {
        if (err) {
            res.status(500).send("Error adding recipient");
        } else {
            res.status(201).send("Recipient added successfully");
        }
    });
});

// Read all recipients
app.get("/recipients", (req, res) => {
    const query = "SELECT * FROM Recipients";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send("Error fetching recipients");
        } else {
            res.json(results);
        }
    });
});

// Update a recipient
app.put("/recipients/:id", (req, res) => {
    const { id } = req.params;
    const { name, contact_info } = req.body;
    const query = "UPDATE Recipients SET name = ?, contact_info = ? WHERE recipient_id = ?";
    db.query(query, [name, contact_info, id], (err) => {
        if (err) {
            res.status(500).send("Error updating recipient");
        } else {
            res.send("Recipient updated successfully");
        }
    });
});

// Delete a recipient
app.delete("/recipients/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Recipients WHERE recipient_id = ?";
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).send("Error deleting recipient");
        } else {
            res.send("Recipient deleted successfully");
        }
    });
});

// --- Distributions CRUD Operations ---

// Create a distribution
app.post("/distributions", (req, res) => {
    const { distribution_date, recipient_id } = req.body;
    const query = "INSERT INTO Distributions (distribution_date, recipient_id) VALUES (?, ?)";
    db.query(query, [distribution_date, recipient_id], (err) => {
        if (err) {
            res.status(500).send("Error adding distribution");
        } else {
            res.status(201).send("Distribution added successfully");
        }
    });
});

// Read all distributions
app.get("/distributions", (req, res) => {
    const query = `
        SELECT 
            d.distribution_id, 
            d.distribution_date, 
            r.name AS recipient_name 
        FROM Distributions d
        JOIN Recipients r ON d.recipient_id = r.recipient_id
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send("Error fetching distributions");
        } else {
            res.json(results);
        }
    });
});

// Update a distribution
app.put("/distributions/:id", (req, res) => {
    const { id } = req.params;
    const { distribution_date, recipient_id } = req.body;
    const query = "UPDATE Distributions SET distribution_date = ?, recipient_id = ? WHERE distribution_id = ?";
    db.query(query, [distribution_date, recipient_id, id], (err) => {
        if (err) {
            res.status(500).send("Error updating distribution");
        } else {
            res.send("Distribution updated successfully");
        }
    });
});

// Delete a distribution
app.delete("/distributions/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Distributions WHERE distribution_id = ?";
    db.query(query, [id], (err) => {
        if (err) {
            res.status(500).send("Error deleting distribution");
        } else {
            res.send("Distribution deleted successfully");
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));