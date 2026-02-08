const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact
router.post('/', async (req, res) => {
  // 1. Add 'phone' to the destructuring
  const { name, email, phone, subject, message } = req.body; 

  try {
    const newContact = new Contact({
      name,
      email,
      phone, // <--- 2. Save it to the database
      subject,
      message
    });

    await newContact.save();

    console.log("✅ Message Saved:", name);
    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;