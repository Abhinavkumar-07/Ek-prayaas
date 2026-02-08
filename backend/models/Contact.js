const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
  },
  subject: {
    type: String,
    default: 'No Subject',
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// THIS IS THE FIX: Check if the model exists, otherwise create it
module.exports = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);