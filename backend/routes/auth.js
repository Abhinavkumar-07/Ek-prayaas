const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

/**
 * =========================
 * REGISTER USER
 * =========================
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    // Send verification email ONLY if email config exists
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        to: email,
        subject: 'Verify your email - Ek Prayas',
        html: `
          <h2>Welcome to Ek Prayas</h2>
          <p>Please verify your email to activate your account.</p>
          <a href="${verifyLink}">Verify Email</a>
          <p>This link is valid for 24 hours.</p>
        `
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Verification email sent.'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

/**
 * =========================
 * VERIFY EMAIL
 * =========================
 */
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token missing'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token'
      });
    }

    if (user.isVerified) {
      return res.json({
        success: true,
        message: 'Email already verified'
      });
    }

    user.isVerified = true;
    await user.save();

    return res.json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

/**
 * =========================
 * LOGIN USER
 * =========================
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email before logging in'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

/**
 * =========================
 * TEST ROUTE
 * =========================
 */
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Auth route working' });
});

module.exports = router;
