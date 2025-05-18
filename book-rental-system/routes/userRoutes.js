const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');

// POST /add-user
router.post('/add-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /user-rentals/:userId
router.get('/user-rentals/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('rentedBooks');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
