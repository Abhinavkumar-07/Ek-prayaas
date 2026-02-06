const express = require('express');
const router = express.Router();
const { Newsletter } = require('../models/index');

router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.isActive) {
        return res.status(400).json({
          success: false,
          message: 'This email is already subscribed!'
        });
      } else {
        // Reactivate subscription
        existing.isActive = true;
        await existing.save();
        return res.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.'
        });
      }
    }

    // Create new subscription
    await Newsletter.create({ email, name });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe',
      error: error.message
    });
  }
});

module.exports = router;
