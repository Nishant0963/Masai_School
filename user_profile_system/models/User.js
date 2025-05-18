const mongoose = require('mongoose');
const { isURL } = require('validator');

const profileSchema = new mongoose.Schema({
  profileName: {
    type: String,
    required: [true, 'Profile name is required'],
    enum: ['fb', 'twitter', 'github', 'instagram']
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    validate: [isURL, 'Invalid URL']
  }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  profiles: [profileSchema]
});

module.exports = mongoose.model('User', userSchema);