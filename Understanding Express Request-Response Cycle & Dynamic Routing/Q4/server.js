const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const DB_PATH = "./db.json";

// Read DB
const readDB = () => {
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
};

// Write DB
const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
};

// Add a new book
app.post("/books", (req, res) => {
    const db = readDB();
    const newBook = req.body;
    db.push(newBook);
    writeDB(db);
    res.status(201).send("Book added successfully.");
});

// Get all books
app.get("/books", (req, res) => {
    const db = readDB();
    res.json(db);
});

// Get book by ID
app.get("/books/:id", (req, res) => {
    const db = readDB();
    const book = db.find(b => b.id == req.params.id);
    if (book) res.json(book);
    else res.status(404).send("Book not found");
});

// Update book by ID
app.put("/books/:id", (req, res) => {
    const db = readDB();
    const index = db.findIndex(b => b.id == req.params.id);
    if (index !== -1) {
        db[index] = { ...db[index], ...req.body };
        writeDB(db);
        res.send("Book updated successfully.");
    } else {
        res.status(404).send("Book not found");
    }
});

// Delete book by ID
app.delete("/books/:id", (req, res) => {
    const db = readDB();
    const newDB = db.filter(b => b.id != req.params.id);
    if (newDB.length !== db.length) {
        writeDB(newDB);
        res.send("Book deleted successfully.");
    } else {
        res.status(404).send("Book not found");
    }
});

// Search by author or title
app.get("/books/search", (req, res) => {
    const { author, title } = req.query;
    const db = readDB();
    let results = db;
    if (author) {
        results = results.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
    }
    if (title) {
        results = results.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (results.length > 0) res.json(results);
    else res.status(404).send("No books found");
});

// 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));