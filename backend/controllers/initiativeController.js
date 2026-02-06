const Initiative = require('../models/Initiative');

// @desc    Get all initiatives
// @route   GET /api/initiatives
// @access  Public
exports.getAllInitiatives = async (req, res) => {
  try {
    const { category, isActive, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const initiatives = await Initiative.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Initiative.countDocuments(query);

    res.json({
      success: true,
      data: initiatives,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single initiative by slug
// @route   GET /api/initiatives/:slug
// @access  Public
exports.getInitiativeBySlug = async (req, res) => {
  try {
    const initiative = await Initiative.findOne({ slug: req.params.slug });

    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: 'Initiative not found'
      });
    }

    res.json({
      success: true,
      data: initiative
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new initiative
// @route   POST /api/initiatives
// @access  Private/Admin
exports.createInitiative = async (req, res) => {
  try {
    const initiative = await Initiative.create(req.body);

    res.status(201).json({
      success: true,
      data: initiative,
      message: 'Initiative created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create initiative',
      error: error.message
    });
  }
};

// @desc    Update initiative
// @route   PUT /api/initiatives/:id
// @access  Private/Admin
exports.updateInitiative = async (req, res) => {
  try {
    const initiative = await Initiative.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: 'Initiative not found'
      });
    }

    res.json({
      success: true,
      data: initiative,
      message: 'Initiative updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update initiative',
      error: error.message
    });
  }
};

// @desc    Delete initiative
// @route   DELETE /api/initiatives/:id
// @access  Private/Super Admin
exports.deleteInitiative = async (req, res) => {
  try {
    const initiative = await Initiative.findByIdAndDelete(req.params.id);

    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: 'Initiative not found'
      });
    }

    res.json({
      success: true,
      message: 'Initiative deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete initiative',
      error: error.message
    });
  }
};
