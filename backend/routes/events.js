const express = require('express');
const router = express.Router();

// ============== EVENTS ROUTES ==============
const {
  getAllEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

router.get('/', getAllEvents);
router.get('/:slug', getEventBySlug);

module.exports = router;
