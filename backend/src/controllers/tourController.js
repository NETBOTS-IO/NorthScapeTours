import Tour from '../models/tourModel.js';
import upload from '../utils/multerConfig.js'; // Remove { } since it's a default export

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: 'Tours fetched successfully',
      data: tours
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tours',
      error: error.message
    });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: 'Tour fetched successfully',
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tour',
      error: error.message
    });
  }
};

export const createTour = async (req, res) => {
  try {
    // Ensure multer processed the files
    // console.log("Uploaded Files:", req.files);

    // Validate tour data presence
    let tourData;
    if (req.body.tourData) {
      try {
        tourData = JSON.parse(req.body.tourData);
      } catch (parseError) {
        return res.status(400).json({ success: false, message: 'Invalid JSON format', error: parseError.message });
      }
    } else {
      tourData = req.body;
    }

    if (!tourData.name || (!tourData.shortDescription && !tourData.longDescription)) {
      return res.status(400).json({ success: false, message: 'Name and at least one description (shortDescription or longDescription) are required' });
    }

    // Process Tour Images
    if (req.files?.images) {
      tourData.images = req.files.images.map(file => `/uploads/tours/${file.filename}`);
    }

    // Process Itinerary Images
    if (req.files?.itineraryImages && Array.isArray(tourData.itineraries)) {
      let currentImageIndex = 0;
      tourData.itineraries = tourData.itineraries.map(itinerary => {
        const imageCount = itinerary.imageCount || 0;
        const itineraryImages = req.files.itineraryImages
          .slice(currentImageIndex, currentImageIndex + imageCount)
          .map(file => `/uploads/itineraries/${file.filename}`);
        currentImageIndex += imageCount;
        return { ...itinerary, images: itineraryImages };
      });
    }

    // Ensure new fields are handled (whyChoose, tags, relatedTrips, etc.)
    tourData.whyChoose = tourData.whyChoose || [];
    tourData.tags = tourData.tags || [];
    tourData.relatedTrips = tourData.relatedTrips || [];
    tourData.features = tourData.features || [];
    tourData.highlights = tourData.highlights || [];
    tourData.included = tourData.included || [];
    tourData.inclusions = tourData.inclusions || [];
    tourData.exclusions = tourData.exclusions || [];
    tourData.faqs = tourData.faqs || [];
    tourData.termsAndConditions = tourData.termsAndConditions || [];
    tourData.policies = tourData.policies || [];

    // Create Tour Entry in DB
    const tour = await Tour.create(tourData);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.status(201).json({ success: true, message: 'Tour created successfully', data: tour });
  } catch (error) {
    // Log and respond with error information
    console.error("Error creating tour:", error);
    res.status(500).json({ success: false, message: 'Error creating tour', error: error.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    console.log("Update Tour API Endpoint Hit", req.body);
    
    let tourData;
    if (req.body.tourData) {
      try {
        tourData = JSON.parse(req.body.tourData);
      } catch (parseError) {
        console.log("Error in parsing JSON", parseError);
        return res.status(400).json({ success: false, message: "Invalid JSON format", error: parseError.message });
      }
    } else {
      tourData = req.body;
    }

    if (!tourData.name || (!tourData.shortDescription && !tourData.longDescription)) {
      console.log("Name and at least one description are required");
      return res.status(400).json({ success: false, message: "Name and at least one description (shortDescription or longDescription) are required" });
    }

    // Process images from multer (req.files)
    if (req.files?.images) {
      const newImages = req.files.images.map((file) => `/uploads/tours/${file.filename}`);
      tourData.images = [...(tourData.images || []), ...newImages];
    }

    if (req.files?.itineraryImages && Array.isArray(tourData.itineraries)) {
      let currentImageIndex = 0;
      tourData.itineraries = tourData.itineraries.map((itinerary) => {
        const imageCount = itinerary.imageCount || 0;
        if (imageCount > 0) {
          const newImages = req.files.itineraryImages
            .slice(currentImageIndex, currentImageIndex + imageCount)
            .map((file) => `/uploads/tours/${file.filename}`);
          currentImageIndex += imageCount;
          return { ...itinerary, images: [...(itinerary.images || []), ...newImages] };
        }
        return itinerary;
      });
    }

    // Ensure new fields are handled (whyChoose, tags, relatedTrips, etc.)
    tourData.whyChoose = tourData.whyChoose || [];
    tourData.tags = tourData.tags || [];
    tourData.relatedTrips = tourData.relatedTrips || [];
    tourData.features = tourData.features || [];
    tourData.highlights = tourData.highlights || [];
    tourData.included = tourData.included || [];
    tourData.inclusions = tourData.inclusions || [];
    tourData.exclusions = tourData.exclusions || [];
    tourData.faqs = tourData.faqs || [];
    tourData.termsAndConditions = tourData.termsAndConditions || [];
    tourData.policies = tourData.policies || [];

    // Update the tour in MongoDB
    const tour = await Tour.findByIdAndUpdate(req.params.tourId, tourData, { new: true });
    if (!tour) {
      console.log("Tour not found");
      return res.status(404).json({ success: false, message: "Tour not found" });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({ success: true, message: "Tour updated successfully", data: tour });
  } catch (error) {
    console.log("Error in updating tour", error.message);
    res.status(500).json({ success: false, message: "Error updating tour", error: error.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ success: false, message: 'Tour ID is required' });
    }
    
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({ success: true, message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting tour', error: error.message });
  }
};

export const searchTours = async (req, res) => {
  try {
    const { category, difficulty, priceMin, priceMax, location } = req.query;
    const query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    const tours = await Tour.find(query);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: 'Tours searched successfully',
      data: tours
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching tours',
      error: error.message
    });
  }
}; 

export const getRelatedTours = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    // Find up to 3 tours with the same category, excluding the current tour
    const relatedTours = await Tour.find({
      category: tour.category,
      // _id: { $ne: tour._id }
    }).limit(3);
    res.json({ success: true, data: relatedTours });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching related tours', error: error.message });
  }
}; 

export const getTourCategories = async (req, res) => {
  try {
    const categories = await Tour.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 }, categoryId: { $first: "$_id" }  } },
      { $sort: { count: -1 } }
    ]);
    console.log('categories', categories)
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching categories', error: error.message });
  }
}; 