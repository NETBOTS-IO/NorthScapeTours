import testimonialsModel from "../models/testimonialsModel.js";

class TestimonialsServices {

  async getAllTestimonials(query = {}) {
    const {
      page = 1,
      limit = 10,
      search,
    } = query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const testimonials = await testimonialsModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    const total = await testimonialsModel.countDocuments(filter);

    return {
      testimonials,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
    };
  }


}

const testimonialsServices = new TestimonialsServices();
export default testimonialsServices;
