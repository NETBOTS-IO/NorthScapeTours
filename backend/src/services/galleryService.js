import GalleryPhoto from '../models/galleryModel.js';

class GalleryService {
  async createPhoto(photoData) {
    return await GalleryPhoto.create(photoData);
  }

  async getAllPhotos(query = {}) {
    // Add pagination/filtering as needed
    const { page = 1, limit = 15, category, search } = query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { photographer: { $regex: search, $options: 'i' } }
      ];
    }
    const photos = await GalleryPhoto.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await GalleryPhoto.countDocuments(filter);
    return {
      photos,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page)
    };
  }

  async getPhotoById(id) {
    const photo = await GalleryPhoto.findById(id);
    if (!photo) {
      throw new Error('Photo not found');
    }
    return photo;
  }

  async updatePhoto(id, photoData) {
    const photo = await GalleryPhoto.findByIdAndUpdate(id, photoData, {
      new: true,
      runValidators: true
    });
    if (!photo) {
      throw new Error('Photo not found');
    }
    return photo;
  }

  async deletePhoto(id) {
    const photo = await GalleryPhoto.findByIdAndDelete(id);
    if (!photo) {
      throw new Error('Photo not found');
    }
    return photo;
  }
}

export default new GalleryService(); 