const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please provide role'],
    trim: true
  },
  designation: {
    type: String,
    enum: ['president', 'vice-president', 'secretary', 'treasurer', 'coordinator', 'member', 'advisor'],
    default: 'member'
  },
  department: String,
  year: String,
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  image: {
    type: String,
    default: '/uploads/default-avatar.jpg'
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: String,
  social: {
    linkedin: String,
    instagram: String,
    twitter: String
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);
