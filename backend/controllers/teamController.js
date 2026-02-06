const TeamMember = require('../models/TeamMember');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getAllTeamMembers = async (req, res) => {
  try {
    const { role, active } = req.query;
    let query = {};
    
    if (role) query.role = role;
    if (active !== undefined) query.active = active === 'true';
    
    const teamMembers = await TeamMember.find(query).sort({ displayOrder: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private (Admin)
exports.createTeamMember = async (req, res) => {
  try {
    const memberData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    };
    
    const teamMember = await TeamMember.create(memberData);
    
    res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      data: teamMember
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add team member',
      error: error.message
    });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private (Admin)
exports.updateTeamMember = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      ...(req.file && { image: `/uploads/${req.file.filename}` })
    };
    
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: teamMember
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update team member',
      error: error.message
    });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private (Admin)
exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
