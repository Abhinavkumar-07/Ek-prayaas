const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure you have this

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getMe);

// Add the Verify Route
router.get('/verify/:token', authController.verifyEmail);

module.exports = router;
