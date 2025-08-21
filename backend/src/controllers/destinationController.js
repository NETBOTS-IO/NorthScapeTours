import Destination from "../models/destinationsModel.js";

export const getAllDestinations = async (req, res) => {
  try {
    const Destinations = await Destination.find();
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Destinations fetched successfully",
      data: Destinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Destinations",
      error: error.message,
    });
  }
};

export const getDestinationsById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Destination fetched successfully",
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Destination",
      error: error.message,
    });
  }
};

export const createDestination = async (req, res) => {
  try {
    // Validate Destination data presence
    let DestinationData;
    if (req.body.DestinationData) {
      try {
        DestinationData = JSON.parse(req.body.DestinationData);
      } catch (parseError) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Invalid JSON format",
            error: parseError.message,
          });
      }
    } else {
      DestinationData = req.body;
    }

    if (
      !DestinationData.name ||
      (!DestinationData.shortDescription && !DestinationData.longDescription)
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Name and at least one description (shortDescription or longDescription) are required",
        });
    }

    // Process Destination Images
    if (req.files?.images) {
      DestinationData.images = req.files.images.map(
        (file) => `/uploads/destinations/${file.filename}`
      );
    }

    // Process Itinerary Images
    if (
      req.files?.itineraryImages &&
      Array.isArray(DestinationData.itineraries)
    ) {
      let currentImageIndex = 0;
      DestinationData.itineraries = DestinationData.itineraries.map(
        (itinerary) => {
          const imageCount = itinerary.imageCount || 0;
          const itineraryImages = req.files.itineraryImages
            .slice(currentImageIndex, currentImageIndex + imageCount)
            .map((file) => `/uploads/destinations/${file.filename}`);
          currentImageIndex += imageCount;
          return { ...itinerary, images: itineraryImages };
        }
      );
    }

    // Ensure new fields are handled (whyChoose, tags, relatedTrips, etc.)
    DestinationData.whyChoose = DestinationData.whyChoose || [];
    DestinationData.tags = DestinationData.tags || [];
    DestinationData.relatedTrips = DestinationData.relatedTrips || [];
    DestinationData.features = DestinationData.features || [];
    DestinationData.highlights = DestinationData.highlights || [];
    DestinationData.included = DestinationData.included || [];
    DestinationData.inclusions = DestinationData.inclusions || [];
    DestinationData.exclusions = DestinationData.exclusions || [];
    DestinationData.faqs = DestinationData.faqs || [];
    DestinationData.termsAndConditions =
      DestinationData.termsAndConditions || [];
    DestinationData.policies = DestinationData.policies || [];

    // Create Destination Entry in DB
    const destination = await Destination.create(DestinationData);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res
      .status(201)
      .json({
        success: true,
        message: "Destination created successfully",
        data: destination,
      });
  } catch (error) {
    // Log and respond with error information
    console.error("Error creating Destination:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating Destination",
        error: error.message,
      });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const existingDestination = await Destination.findById(
      req.params.destinationId
    );
    // console.log('existingDestination', existingDestination);
    let DestinationData;
    if (req.body.DestinationData) {
      try {
        DestinationData = JSON.parse(req.body.DestinationData);
      } catch (parseError) {
        console.log("Error in parsing JSON", parseError);
        return res
          .status(400)
          .json({
            success: false,
            message: "Invalid JSON format",
            error: parseError.message,
          });
      }
    } else {
      DestinationData = req.body;
    }

    if (
      !DestinationData.name ||
      (!DestinationData.shortDescription && !DestinationData.longDescription)
    ) {
      console.log("Name and at least one description are required");
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Name and at least one description (shortDescription or longDescription) are required",
        });
    }

    // console.log("DestinationData", DestinationData);
    const { existImage } = DestinationData;
    const { itineraries } = DestinationData;

    // console.log('itineraries', itineraries);
    // console.log('existImage length', existImage.length);
    // console.log('existingDestination length', existingDestination.images.length);

    // Process images from multer (req.files)
    if (req.files?.images && !existImage.length) {
      const newImages = req.files.images.map(
        (file) => `/uploads/destinations/${file.filename}`
      );
      // console.log("newImages", newImages);
      DestinationData.images = [
        ...(existingDestination.images || []),
        ...newImages,
      ];
      // console.log(
      //   "DestinationData.images while new images ",
      //   DestinationData.images
      // );
    }

    if (existImage.length === existingDestination.images.length && req.files?.images) {
      const newImages = req.files.images.map(
        (file) => `/uploads/destinations/${file.filename}`
      );
      // console.log("newImages with eixsting images", newImages);
      DestinationData.images = [
        ...(existingDestination.images || []),
        ...newImages,
      ];

      // console.log(
      //   "DestinationData.images while remove but has exist some images ",
      //   DestinationData.images
      // );
    }else if(existImage.length !== existingDestination.images.length && req.files?.images){
       const newImages = req.files.images.map(
        (file) => `/uploads/destinations/${file.filename}`
      );
      // console.log("newImages with eixsting images length not equal", newImages);
      DestinationData.images = [
        ...(existingDestination.images || []),
        ...newImages,
      ];

      // console.log(
      //   "DestinationData.images while remove but has exist some images length not equal",
      //   DestinationData.images
      // );
    } else {
      DestinationData.images = existImage;
      // console.log(
      //   "DestinationData.images while no new image",
      //   DestinationData.images
      // );
    }

   if (req.files?.itineraryImages && Array.isArray(DestinationData.itineraries)) {
  let currentImageIndex = 0;

  DestinationData.itineraries = DestinationData.itineraries.map((itinerary, i) => {
    const imageCount = itinerary.imageCount || 0;

    // Take only THIS itinerary's old images (filtering blobs)
    const existingImages = (DestinationData.itineraries[i]?.images || [])
      .filter(img => !img.startsWith("blob:"));

    if (imageCount > 0) {
      const newImages = req.files.itineraryImages
        .slice(currentImageIndex, currentImageIndex + imageCount)
        .map(file => `/uploads/destinations/${file.filename}`);

      currentImageIndex += imageCount;

      return {
        ...itinerary,
        images: [...existingImages, ...newImages],  // ✅ flat array
      };
    }

    return {
      ...itinerary,
      images: existingImages,  // ✅ keep old, filtered images
    };
  });
} else if (DestinationData.itineraries) {
  DestinationData.itineraries = DestinationData.itineraries.map((itinerary) => ({
    ...itinerary,
    images: (itinerary.images || []).filter(img => !img.startsWith("blob:")),
  }));
}

    // Ensure new fields are handled (whyChoose, tags, relatedTrips, etc.)
    DestinationData.whyChoose = DestinationData.whyChoose || [];
    DestinationData.tags = DestinationData.tags || [];
    DestinationData.relatedTrips = DestinationData.relatedTrips || [];
    DestinationData.features = DestinationData.features || [];
    DestinationData.highlights = DestinationData.highlights || [];
    DestinationData.included = DestinationData.included || [];
    DestinationData.inclusions = DestinationData.inclusions || [];
    DestinationData.exclusions = DestinationData.exclusions || [];
    DestinationData.faqs = DestinationData.faqs || [];
    DestinationData.termsAndConditions =
      DestinationData.termsAndConditions || [];
    DestinationData.policies = DestinationData.policies || [];

    // Update the Destination in MongoDB
    const destination = await Destination.findByIdAndUpdate(
      req.params.destinationId,
      DestinationData,
      { new: true }
    );
    // console.log('destination', destination)
    if (!destination) {
      console.log("Destination not found");
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Destination updated successfully",
      data: destination,
    });
  } catch (error) {
    console.log("Error in updating Destination", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating Destination",
        error: error.message,
      });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Destination ID is required" });
    }

    const Destination = await Destination.findByIdAndDelete(req.params.id);
    if (!Destination) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({ success: true, message: "Destination deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting Destination",
        error: error.message,
      });
  }
};

export const searchDestinations = async (req, res) => {
  try {
    const { category, difficulty, priceMin, priceMax, location } = req.query;
    const query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (location) query.location = { $regex: location, $options: "i" };
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    const Destinations = await Destination.find(query);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Destinations searched successfully",
      data: Destinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching Destinations",
      error: error.message,
    });
  }
};

export const getRelatedDestinations = async (req, res) => {
  try {
    const Destination = await Destination.findById(req.params.id);
    if (!Destination) {
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
    // Find up to 3 Destinations with the same category, excluding the current Destination
    const relatedDestinations = await Destination.find({
      category: Destination.category,
      // _id: { $ne: Destination._id }
    }).limit(3);
    res.json({ success: true, data: relatedDestinations });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching related Destinations",
        error: error.message,
      });
  }
};

export const getDestinationCategories = async (req, res) => {
  try {
    const categories = await Destination.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          categoryId: { $first: "$_id" },
        },
      },
      { $sort: { count: -1 } },
    ]);
    console.log("categories", categories);
    res.json({ success: true, data: categories });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching categories",
        error: error.message,
      });
  }
};

export const updateBookingDestination = async (req, res) => {
  try {
    console.log("Update Destination API Endpoint Hit", req.body);

    let DestinationData;
    if (req.body.DestinationData) {
      try {
        DestinationData = JSON.parse(req.body.DestinationData);
      } catch (parseError) {
        console.log("Error in parsing JSON", parseError);
        return res
          .status(400)
          .json({
            success: false,
            message: "Invalid JSON format",
            error: parseError.message,
          });
      }
    } else {
      DestinationData = req.body;
    }

    DestinationData.availability = DestinationData.availability;

    // Update the Destination in MongoDB
    const Destination = await Destination.findByIdAndUpdate(
      req.params.id,
      DestinationData,
      { new: true }
    );
    if (!Destination) {
      console.log("Destination not found");
      return res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", Date.now().toString()); // Ensure new data each time
    res.json({
      success: true,
      message: "Destination updated successfully",
      data: Destination,
    });
  } catch (error) {
    console.log("Error in updating Destination", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating Destination",
        error: error.message,
      });
  }
};
