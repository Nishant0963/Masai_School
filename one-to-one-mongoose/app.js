const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(profileRoutes);

mongoose.connect('mongodb://localhost:27017/one-to-one-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.error(err));
