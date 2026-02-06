// Simple gallery controller for managing standalone images

const galleryImages = []; // In-memory storage (use DB model for production)

exports.getAllImages = async (req, res) => {
  try {
    res.json({
      success: true,
      count: galleryImages.length,
      data: galleryImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    const uploadedImages = req.files.map((file, index) => ({
      id: Date.now() + index,
      url: `/uploads/${file.filename}`,
      caption: req.body.captions ? req.body.captions[index] : '',
      uploadedAt: new Date()
    }));
    
    galleryImages.push(...uploadedImages);
    
    res.status(201).json({
      success: true,
      message: 'Images uploaded successfully',
      data: uploadedImages
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to upload images',
      error: error.message
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const index = galleryImages.findIndex(img => img.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    galleryImages.splice(index, 1);
    
    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
