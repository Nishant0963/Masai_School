const express = require('express');
const adminRoutes = require('./routes/admin/books');
const readerRoutes = require('./routes/reader/books');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/admin', adminRoutes);
app.use('/reader', readerRoutes);

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
