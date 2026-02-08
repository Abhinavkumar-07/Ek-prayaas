const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

exports.submitContact = async (req, res) => {
  try {
    // Check if body exists
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, error: "No data received" });
    }

    const contact = await Contact.create(req.body);

    // Send emails (optional try-catch so it doesn't crash the response)
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New Inquiry: ${req.body.subject}`,
        message: `From: ${req.body.name}\nEmail: ${req.body.email}\n\n${req.body.message}`
      });
    } catch (e) {
      console.log("Email notification failed, but contact was saved.");
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};