const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please provide role'],
    enum: ['president', 'vice-president', 'secretary', 'treasurer', 'coordinator', 'member', 'advisor']
  },
  department: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th', 'Alumni', 'Faculty']
  },
  bio: {
    type: String,
    maxlength: 500
  },
  image: {
    type: String,
    default: 'default-avatar.jpg'
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    instagram: String,
    facebook: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  active: {
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

module.exports = mongoose.model('TeamMember', teamMemberSchema);
