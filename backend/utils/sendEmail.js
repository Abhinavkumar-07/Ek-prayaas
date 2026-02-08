const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Gets from .env
      pass: process.env.EMAIL_PASS, // Gets from .env
    },
  });

  // Define Email Options
  const mailOptions = {
    from: `"Ek-Prayas Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // Send Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
