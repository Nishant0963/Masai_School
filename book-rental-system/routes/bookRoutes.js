const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');

// POST /add-book
router.post('/add-book', async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /rent-book
router.post('/rent-book', async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);
    if (!user || !book) return res.status(404).json({ error: 'User or Book not found' });

    if (!user.rentedBooks.includes(bookId)) user.rentedBooks.push(bookId);
    if (!book.rentedBy.includes(userId)) book.rentedBy.push(userId);
    await user.save();
    await book.save();

    res.json({ message: 'Book rented successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /return-book
router.post('/return-book', async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    await User.findByIdAndUpdate(userId, { $pull: { rentedBooks: bookId } });
    await Book.findByIdAndUpdate(bookId, { $pull: { rentedBy: userId } });

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /book-renters/:bookId
router.get('/book-renters/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate('rentedBy');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /update-book/:bookId
router.put('/update-book/:bookId', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /delete-book/:bookId
router.delete('/delete-book/:bookId', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    await User.updateMany({}, { $pull: { rentedBooks: book._id } });
    res.json({ message: 'Book deleted and users updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
