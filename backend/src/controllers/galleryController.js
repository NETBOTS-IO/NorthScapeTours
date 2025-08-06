import galleryService from '../services/galleryService.js';

const getImageUrls = (files) => {
  if (!files || !files.src) return [];
  return files.src.map(file => `/uploads/gallery/${file.filename}`);
};

export const getAllPhotos = async (req, res) => {
  try {
    const result = await galleryService.getAllPhotos(req.query);
    res.json({
      success: true,
      message: 'Gallery photos fetched successfully',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery photos',
      error: error.message
    });
  }
};

export const getPhotoById = async (req, res) => {
  try {
    const photo = await galleryService.getPhotoById(req.params.id);
    res.json({
      success: true,
      message: 'Gallery photo fetched successfully',
      data: photo
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Gallery photo not found',
      error: error.message
    });
  }
};

export const createPhoto = async (req, res) => {
  try {
    // Handle uploaded images
    if (req.files && req.files.src) {
      req.body.src = getImageUrls(req.files);
    }
    // If src is a string (single image from form), convert to array
    if (typeof req.body.src === 'string') {
      req.body.src = [req.body.src];
    }
    const photo = await galleryService.createPhoto(req.body);
    res.status(201).json({
      success: true,
      message: 'Gallery photo created successfully',
      data: photo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating gallery photo',
      error: error.message
    });
  }
};

export const updatePhoto = async (req, res) => {
  try {
    // Handle uploaded images
    let newSrc = [];
    if (req.files && req.files.src) {
      newSrc = getImageUrls(req.files);
    }
    // If src is a string (single image from form), convert to array
    if (typeof req.body.src === 'string') {
      req.body.src = [req.body.src];
    }
    // Merge new uploaded images with any existing src
    if (Array.isArray(req.body.src)) {
      req.body.src = [...req.body.src, ...newSrc];
    } else if (newSrc.length > 0) {
      req.body.src = newSrc;
    }
    const photo = await galleryService.updatePhoto(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Gallery photo updated successfully',
      data: photo
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Gallery photo not found or update failed',
      error: error.message
    });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    await galleryService.deletePhoto(req.params.id);
    res.json({
      success: true,
      message: 'Gallery photo deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Gallery photo not found or delete failed',
      error: error.message
    });
  }
}; 