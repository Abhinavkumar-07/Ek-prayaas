const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true
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
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  date: {
    type: Date,
    required: [true, 'Please provide event date']
  },
  endDate: Date,
  time: String,
  location: {
    venue: String,
    address: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  image: {
    type: String,
    default: '/uploads/default-event.jpg'
  },
  category: {
    type: String,
    enum: ['workshop', 'drive', 'visit', 'campaign', 'celebration', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  attendees: {
    registered: {
      type: Number,
      default: 0
    },
    attended: {
      type: Number,
      default: 0
    }
  },
  gallery: [{
    type: String
  }],
  organizers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

eventSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Update status based on date
eventSchema.pre('find', function() {
  const now = new Date();
  this.updateMany(
    { date: { $lt: now }, status: 'upcoming' },
    { $set: { status: 'completed' } }
  );
});

module.exports = mongoose.model('Event', eventSchema);
