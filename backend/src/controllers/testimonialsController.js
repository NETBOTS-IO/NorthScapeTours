import Testimonials from "../models/testimonialsModel.js";
import testimonialsServices from "../services/testimonialsService.js";

const getImageUrls = (files) => {
  if (!files || !files.image) return [];
  return files.image.map((file) => `/uploads/testimonials/${file.filename}`);
};

export const createTestimonials = async (req, res) => {
  try {
    // Parse the JSON string sent under "data"
    const data = JSON.parse(req.body.data);

    if (req.files && req.files.image) {
      req.body.image = getImageUrls(req.files);
    }

    if (typeof req.body.image === "string") {
      req.body.image = [req.body.image];
    }

    const newTestimonials = new Testimonials({
      ...data,
      rating: data.rating ? Number(data.rating) : undefined,
      tags: Array.isArray(data.tags) ? data.tags : [data.tags],
      image: req.body.image,
    });

    await newTestimonials.save();

    res.status(200).json({
      message: "Testimonials created successfully",
      testimonials: newTestimonials,
      success: true,
    });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: error.message, success: false });
  }
};



export const getTestimonials = async (req, res) => {
  try {
   const testimonials =  await testimonialsServices.getAllTestimonials(req.query);
    if (!testimonials) {
      res
        .status(404)
        .json({ message: "Testimonials not found", success: false });
    }
    res.status(200).json({
      message: "Testimonial fetched successfully",
      data: testimonials,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assuming you're using Multer for handling file uploads
export const updateTestimonial = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);

    const testimonial = await Testimonials.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Handle new uploaded image (if exists), otherwise keep old one
    const imageUrl = req.file ? getImageUrls(req.file) : testimonial.image;

    // Now update the record
    testimonial.name = data.name || testimonial.name;
    testimonial.description = data.description || testimonial.description;
    testimonial.location = data.location || testimonial.location;
    testimonial.occupation = data.occupation || testimonial.occupation;
    testimonial.rating = data.rating || testimonial.rating;
    testimonial.tags = data.tags || testimonial.tags;
    testimonial.image = imageUrl;

    await testimonial.save();

    res.status(200).json({ message: "Testimonial updated",success: true, testimonial });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error while updating testimonial" });
  }
};


export const deleteTestimonials = async(req, res)=>{
  try {
    const deleted = await Testimonials.findByIdAndDelete(req.params.id);
    if(!deleted){
      res.status(404).json({message: "Testimonial not found", succes: false})
    }
    res.status(200).json({message: "Testimonial Deleted succesfully", succes: true})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
export const getTestimonialsById = async(req, res)=>{
  try {
    const testimonial = await Testimonials.findById(req.params.id);
    if(!testimonial){
      res.status(404).json({message: "Testimonial not found", succes: false})
    }
    res.status(200).json({message: "Testimonial fetched succesfully", succes: true, data: testimonial})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
