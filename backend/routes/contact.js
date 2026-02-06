const express = require('express');
const router = express.Router();
const { Contact } = require('../models/index');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

module.exports = router;
