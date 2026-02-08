const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import the Model

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // 1. Create a new Contact entry
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    // 2. Save it to MongoDB
    await newContact.save();

    console.log("✅ Message Saved to Database:", name);
    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
