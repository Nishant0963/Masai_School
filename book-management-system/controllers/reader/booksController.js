const { readBooks, writeBooks } = require('../../models/bookModel');
const logTransaction = require('../../middlewares/transactionLogger');

exports.getAvailableBooks = (req, res) => {
    const books = readBooks().filter(b => b.status === 'available');
    res.json(books);
};

exports.borrowBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { readerName } = req.body;
    if (!readerName) return res.status(400).json({ error: 'Reader name is required' });

    const books = readBooks();
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.status !== 'available') return res.status(400).json({ error: 'Book is already borrowed' });

    book.status = 'borrowed';
    book.borrowedBy = readerName;
    book.borrowedDate = new Date().toISOString().split('T')[0];

    writeBooks(books);
    logTransaction(`${readerName} borrowed "${book.title}"`);
    res.json(book);
};

exports.returnBook = (req, res) => {
    const id = parseInt(req.params.id);
    const books = readBooks();
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const readerName = book.borrowedBy;
    book.status = 'available';
    delete book.borrowedBy;
    delete book.borrowedDate;

    writeBooks(books);
    logTransaction(`${readerName} returned "${book.title}"`);
    res.json(book);
};
