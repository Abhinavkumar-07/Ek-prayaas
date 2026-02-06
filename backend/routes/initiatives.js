const express = require('express');
const router = express.Router();
const {
  getAllInitiatives,
  getInitiativeBySlug,
  createInitiative,
  updateInitiative,
  deleteInitiative
} = require('../controllers/initiativeController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllInitiatives);
router.get('/:slug', getInitiativeBySlug);

// Protected routes (admin only)
router.post('/', protect, authorize('admin', 'super-admin'), createInitiative);
router.put('/:id', protect, authorize('admin', 'super-admin'), updateInitiative);
router.delete('/:id', protect, authorize('super-admin'), deleteInitiative);

module.exports = router;
