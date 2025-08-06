import Tour from '../models/tourModel.js';

class TourService {
  async createTour(tourData) {
    return await Tour.create(tourData);
  }

  async getAllTours(query = {}) {
    const { page = 1, limit = 10, category, difficulty, minPrice, maxPrice, search } = query;
    
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { longDescription: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const tours = await Tour.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Tour.countDocuments(filter);

    return {
      tours,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page)
    };
  }

  async getTourById(id) {
    const tour = await Tour.findById(id);
    if (!tour) {
      throw new Error('Tour not found');
    }
    return tour;
  }

  async updateTour(id, tourData) {
    const tour = await Tour.findByIdAndUpdate(id, tourData, {
      new: true,
      runValidators: true
    });
    if (!tour) {
      throw new Error('Tour not found');
    }
    return tour;
  }

  async deleteTour(id) {
    const tour = await Tour.findByIdAndDelete(id);
    if (!tour) {
      throw new Error('Tour not found');
    }
    return tour;
  }

  async searchTours(searchQuery) {
    return await Tour.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { shortDescription: { $regex: searchQuery, $options: 'i' } },
        { longDescription: { $regex: searchQuery, $options: 'i' } },
        { location: { $regex: searchQuery, $options: 'i' } }
      ]
    });
  }
}

const tourService = new TourService();
export default tourService; 