const express = require('express');
const router = express.Router();
const {
  registerVolunteer,
  getAllVolunteers,
  updateVolunteerStatus
} = require('../controllers/volunteerController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.post('/register', registerVolunteer);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin', 'super-admin'), getAllVolunteers);
router.put('/:id/status', protect, authorize('admin', 'super-admin'), updateVolunteerStatus);

module.exports = router;
