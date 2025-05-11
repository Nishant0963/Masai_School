const express = require('express');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/todos', todoRoutes);

// 404 for undefined routes
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
