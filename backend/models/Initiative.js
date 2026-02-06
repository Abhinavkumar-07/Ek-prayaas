const mongoose = require('mongoose');

const initiativeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide initiative title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide short description'],
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  image: {
    type: String,
    default: '/uploads/default-initiative.jpg'
  },
  impact: {
    beneficiaries: {
      type: Number,
      default: 0
    },
    volunteers: {
      type: Number,
      default: 0
    },
    duration: String
  },
  category: {
    type: String,
    enum: ['education', 'elderly-care', 'health', 'community', 'other'],
    default: 'other'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  gallery: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create slug from title before saving
initiativeSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Initiative', initiativeSchema);
