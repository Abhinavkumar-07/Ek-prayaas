const Volunteer = require('../models/Volunteer');

// @desc    Register as volunteer
// @route   POST /api/volunteers/register
// @access  Public
exports.registerVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Thank you for registering! We will contact you soon.',
      data: volunteer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  Private (Admin)
exports.getAllVolunteers = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status) query.status = status;
    
    const volunteers = await Volunteer.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update volunteer status
// @route   PUT /api/volunteers/:id/status
// @access  Private (Admin)
exports.updateVolunteerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Volunteer status updated',
      data: volunteer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update status',
      error: error.message
    });
  }
};
