const { readBooks } = require('../models/bookModel');

module.exports = (req, res, next) => {
    const id = parseInt(req.params.id);
    const books = readBooks();
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const borrowedDate = new Date(book.borrowedDate);
    const currentDate = new Date();
    const diffTime = currentDate - borrowedDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 3) {
        return res.status(400).json({ error: 'Book cannot be returned within 3 days of borrowing.' });
    }

    next();
};
