const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// POST /add-member
router.post('/add-member', async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /member-borrowed-books/:memberId
router.get('/member-borrowed-books/:memberId', async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId).populate('borrowedBooks');
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
