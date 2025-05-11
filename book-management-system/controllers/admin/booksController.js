const { readBooks, writeBooks } = require('../../models/bookModel');

let nextId = (() => {
    const books = readBooks();
    const maxId = books.reduce((max, b) => Math.max(max, b.id || 0), 0);
    return maxId + 1;
})();

exports.getAllBooks = (req, res) => {
    res.json(readBooks());
};

exports.addBook = (req, res) => {
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear)
        return res.status(400).json({ error: 'All fields are required.' });

    const newBook = {
        id: nextId++,
        title,
        author,
        genre,
        publishedYear,
        status: 'available',
    };
    const books = readBooks();
    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const books = readBooks();
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    Object.assign(book, req.body);
    writeBooks(books);
    res.json(book);
};

exports.deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const books = readBooks();
    const filtered = books.filter(b => b.id !== id);
    if (books.length === filtered.length) return res.status(404).json({ error: 'Book not found' });

    writeBooks(filtered);
    res.json({ message: 'Book deleted' });
};
