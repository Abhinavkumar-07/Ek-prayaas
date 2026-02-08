const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
      password: bcrypt.hashSync(password, 10), // Ensure password is hashed here if not in Model pre-save
      isVerified: false, 
      verificationToken: verificationToken
    });

    await user.save();

    // --- MAGICAL FIX: SIMULATE EMAIL SENDING ---
    const verifyUrl = `http://localhost:5173/verify/${verificationToken}`;
    
    console.log("\n==================================================");
    console.log("✅ ACCOUNT CREATED: " + email);
    console.log("📧 VERIFICATION LINK (Click to Verify):");
    console.log(verifyUrl);
    console.log("==================================================\n");

    // Return success immediately without trying to send real email
    res.status(200).json({ 
      message: 'Registration successful! Check your TERMINAL for the verification link.' 
    });

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