const mongoose = require('mongoose');

// Gallery Model
const gallerySchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['initiative', 'event', 'team', 'impact', 'other'],
    default: 'other'
  },
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedModel'
  },
  relatedModel: {
    type: String,
    enum: ['Initiative', 'Event', null]
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Contact Model
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    trim: true
  },
  phone: String,
  subject: {
    type: String,
    required: [true, 'Please provide subject']
  },
  message: {
    type: String,
    required: [true, 'Please provide message']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  replied: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Newsletter Model
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  name: String,
  isActive: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Admin Model
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    select: false
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'editor'],
    default: 'editor'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date
}, {
  timestamps: true
});

const Gallery = mongoose.model('Gallery', gallerySchema);
const Contact = mongoose.model('Contact', contactSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Gallery, Contact, Newsletter, Admin };
