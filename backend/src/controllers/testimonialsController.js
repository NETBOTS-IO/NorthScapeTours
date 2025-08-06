import Testimonials from "../models/testimonialsModel.js";

const getImageUrls = (files) => {
  if (!files || !files.image) return [];
  return files.image.map((file) => `/uploads/rent/${file.filename}`);
};

export const createTestimonials = async (req, res) => {
  try {
    // Handle uploaded images
    if (req.files && req.files.image) {
      req.body.image = getImageUrls(req.files);
    }
    // If image is a string (single image from form), convert to array
    if (typeof req.body.image === "string") {
      req.body.image = [req.body.image];
    }
    const newTestimonials = new Testimonials({
      image: req.body.image,
      description,
      location,
      rating,
      occupation,
      tags,
    });
    await newTestimonials.save();
    res
      .status(200)
      .json({
        message: "Testimonials created successfully",
        testimonials: newTestimonials,
      });
  } catch (error) {
    res.status(500).json({ messag: error.messag });
  }
};
