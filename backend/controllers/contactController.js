const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Save to Database
    const contact = await Contact.create({
      name,
      email,
      subject: subject || 'New Inquiry',
      message
    });

    // 2. Notify Admin (Optional but recommended)
    // Wrap in a separate try-catch so email failure doesn't break the whole request
    try {
      if (process.env.ADMIN_EMAIL) {
        await sendEmail({
          email: process.env.ADMIN_EMAIL,
          subject: `Website Contact: ${subject || 'New Message'}`,
          message: `You have a new message from ${name} (${email}):\n\n${message}`,
        });
      }
    } catch (emailErr) {
      console.error('Admin notification email failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Message sent successfully'
    });
  } catch (err) {
    console.error('Contact Controller Error:', err);
    res.status(400).json({
      success: false,
      error: err.message || 'Validation failed'
    });
  }
};