const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter using your specific variable names
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: `Ek Prayas <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // 3) Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;