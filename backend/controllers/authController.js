const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); // <--- IMPORANT: Add this import

// --- REGISTER USER ---
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Generate random token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      isVerified: false, 
      verificationToken: verificationToken
    });

    await user.save();

    // --- REAL EMAIL SENDING LOGIC ---
    // Use the dynamic URL from env or fallback to localhost
    const clientUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verifyUrl = `${clientUrl}/verify/${verificationToken}`;

    const message = `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your account:</p>
      <a href="${verifyUrl}" clicktracking=off>${verifyUrl}</a>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Ek-Prayas: Verify your email',
        message,
      });

      res.status(200).json({ 
        message: 'Registration successful! Please check your email to verify account.' 
      });
    } catch (emailError) {
      console.error("Email Send Error:", emailError);
      // Optional: Delete user if email fails so they can try again
      await User.findByIdAndDelete(user._id); 
      return res.status(500).json({ message: 'Email could not be sent. Please try again.' });
    }

  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).send('Server error');
  }
};

// --- LOGIN USER ---
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    // Compare Password
    // Note: If you hashed it manually in register above, ensure compare works here
    // If your User model has a pre-save hook for hashing, use that. 
    // Assuming standard bcrypt compare:
    const isMatch = await bcrypt.compare(password, user.password);
    
    // Fallback: If you are testing and manually inserted non-hashed passwords, check plain text
    // if (password !== user.password) ... 
    
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    // CHECK IF VERIFIED
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }

    const payload = { user: { id: user.id } };
    
    // Sign Token
    jwt.sign(
      payload, 
      process.env.JWT_SECRET || 'secret', // Fallback secret if .env missing
      { expiresIn: '1h' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      }
    );

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send('Server error');
  }
};

// --- VERIFY EMAIL ---
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully! You can now login.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 1. Generate Reset Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // 2. Hash it and save to DB (Security best practice)
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // 3. Set Expiration (10 Minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // 4. Create Reset URL
    // NOTE: Ensure process.env.CLIENT_URL is set in Vercel (e.g., https://your-frontend.vercel.app)
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    const message = `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request',
        message,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Reset Password
// @route   PUT /api/auth/reset-password/:resetToken
exports.resetPassword = async (req, res) => {
  try {
    // 1. Hash the token from the URL to compare with DB
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    // 2. Find user with that token AND check if it's not expired
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // 3. Set new password
    // NOTE: Ensure you are hashing this password before saving if your User model doesn't have a 'pre-save' hook for updates.
    // If your User model has the bcrypt middleware, just setting it is enough:
    user.password = req.body.password; 
    
    // 4. Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};