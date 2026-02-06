const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
  },
  college: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th', 'Other']
  },
  interests: [{
    type: String,
    enum: ['education', 'elderly-care', 'health', 'blood-donation', 'event-management', 'content-creation', 'fundraising', 'teaching', 'other']
  }],
  availability: {
    type: String,
    enum: ['weekdays', 'weekends', 'both', 'flexible'],
    default: 'flexible'
  },
  skills: [String],
  experience: {
    type: String,
    maxlength: 500
  },
  whyJoin: {
    type: String,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  hoursContributed: {
    type: Number,
    default: 0
  },
  eventsAttended: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
