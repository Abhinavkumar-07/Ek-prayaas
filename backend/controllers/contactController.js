const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    // 1. Create the contact entry in the database
    const contact = await Contact.create(req.body);

    // 2. Prepare email details for the administrator
    const adminMessage = `
      You have received a new contact form submission from the Ek Prayas website:
      
      Name: ${contact.name}
      Email: ${contact.email}
      Subject: ${contact.subject || 'No Subject'}
      Message: ${contact.message}
    `;

    // 3. Send notification email to the admin
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New Contact Form: ${contact.subject || 'Inquiry'}`,
        message: adminMessage,
      });
    } catch (emailErr) {
      console.error('Admin notification email failed to send:', emailErr);
      // We don't return an error to the user yet because the data was saved successfully
    }

    // 4. Send a confirmation email to the user
    try {
      await sendEmail({
        email: contact.email,
        subject: 'Thank you for contacting Ek Prayas',
        message: `Dear ${contact.name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nTeam Ek Prayas`,
      });
    } catch (emailErr) {
      console.error('User confirmation email failed to send:', emailErr);
    }

    // 5. Respond to the frontend
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Your message has been sent successfully!'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message || 'Server Error: Could not submit contact form',
    });
  }
};

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Delete a contact submission
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found',
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};