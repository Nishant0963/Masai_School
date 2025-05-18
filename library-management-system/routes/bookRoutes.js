const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Member = require('../models/Member');

// POST /add-book
router.post('/add-book', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /borrow-book
router.post('/borrow-book', async (req, res) => {
  try {
    const { memberId, bookId } = req.body;
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });
    if (book.status === 'borrowed') return res.status(400).json({ error: 'Book is already borrowed' });

    book.status = 'borrowed';
    book.borrowers.push(memberId);
    await book.save();

    member.borrowedBooks.push(bookId);
    await member.save();

    res.json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /return-book
router.post('/return-book', async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);
    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });

    book.borrowers.pull(memberId);
    if (book.borrowers.length === 0) book.status = 'available';
    await book.save();

    member.borrowedBooks.pull(bookId);
    await member.save();

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /book-borrowers/:bookId
router.get('/book-borrowers/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate('borrowers');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /update-book/:bookId
router.put('/update-book/:bookId', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /delete-book/:bookId
router.delete('/delete-book/:bookId', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    await Member.updateMany({}, { $pull: { borrowedBooks: book._id } });
    res.json({ message: 'Book deleted and members updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
