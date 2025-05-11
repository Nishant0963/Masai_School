const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const dbPath = "./db.json";

// Helper to read dishes
const readDishes = () => {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
};

// Helper to write dishes
const writeDishes = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
};

// POST /dishes - Add a new dish
app.post("/dishes", (req, res) => {
    const dishes = readDishes();
    const newDish = req.body;
    dishes.push(newDish);
    writeDishes(dishes);
    res.status(201).json(newDish);
});

// GET /dishes - Get all dishes
app.get("/dishes", (req, res) => {
    const dishes = readDishes();
    res.json(dishes);
});

// GET /dishes/:id - Get dish by ID
app.get("/dishes/:id", (req, res) => {
    const dishes = readDishes();
    const dish = dishes.find(d => d.id == req.params.id);
    if (dish) {
        res.json(dish);
    } else {
        res.status(404).json({ message: "Dish not found" });
    }
});

// PUT /dishes/:id - Update a dish by ID
app.put("/dishes/:id", (req, res) => {
    const dishes = readDishes();
    const index = dishes.findIndex(d => d.id == req.params.id);
    if (index !== -1) {
        dishes[index] = { ...dishes[index], ...req.body };
        writeDishes(dishes);
        res.json(dishes[index]);
    } else {
        res.status(404).json({ message: "Dish not found" });
    }
});

// DELETE /dishes/:id - Delete a dish by ID
app.delete("/dishes/:id", (req, res) => {
    const dishes = readDishes();
    const filtered = dishes.filter(d => d.id != req.params.id);
    if (filtered.length === dishes.length) {
        return res.status(404).json({ message: "Dish not found" });
    }
    writeDishes(filtered);
    res.json({ message: "Dish deleted" });
});

// GET /dishes/get/:name - Search dish by name (partial match supported)
app.get("/dishes/get/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    const dishes = readDishes();
    const result = dishes.filter(d => d.name.toLowerCase().includes(name));
    if (result.length > 0) {
        res.json(result);
    } else {
        res.json({ message: "No dishes found" });
    }
});

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});