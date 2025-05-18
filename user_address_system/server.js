const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/userAddressDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// POST /users — Create a new user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /users/:userId/address — Add new address
app.post('/users/:userId/address', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.addresses.push(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /users/summary — Return summary
app.get('/users/summary', async (req, res) => {
  try {
    const users = await User.find();
    const summary = {
      totalUsers: users.length,
      totalAddresses: users.reduce((acc, user) => acc + user.addresses.length, 0),
      users: users.map(u => ({ name: u.name, addressCount: u.addresses.length }))
    };
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/:id — Get full user details
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BONUS: DELETE /users/:userId/address/:index
app.delete('/users/:userId/address/:index', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const index = parseInt(req.params.index);
    if (index >= user.addresses.length || index < 0)
      return res.status(400).json({ error: 'Invalid address index' });

    user.addresses.splice(index, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));