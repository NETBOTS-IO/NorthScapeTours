import Inquiry from '../models/inquiryModel.js';

class InquiryService {
  async createInquiry(inquiryData) {
    return await Inquiry.create(inquiryData);
  }

  async getAllInquiries(query = {}) {
    const { page = 1, limit = 10, status, tourId, search } = query;
    
    const filter = {};
    if (status) filter.status = status;
    if (tourId) filter.tourId = tourId;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const inquiries = await Inquiry.find(filter)
      .populate('tourId', 'title')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Inquiry.countDocuments(filter);

    return {
      inquiries,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page)
    };
  }

  async getInquiryById(id) {
    const inquiry = await Inquiry.findById(id).populate('tourId', 'title');
    if (!inquiry) {
      throw new Error('Inquiry not found');
    }
    return inquiry;
  }

  async updateInquiry(id, inquiryData) {
    const inquiry = await Inquiry.findByIdAndUpdate(id, inquiryData, {
      new: true,
      runValidators: true
    }).populate('tourId', 'title');
    
    if (!inquiry) {
      throw new Error('Inquiry not found');
    }
    return inquiry;
  }

  async deleteInquiry(id) {
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) {
      throw new Error('Inquiry not found');
    }
    return inquiry;
  }

  async updateInquiryStatus(id, status) {
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('tourId', 'title');

    if (!inquiry) {
      throw new Error('Inquiry not found');
    }
    return inquiry;
  }

  async getInquiriesByTour(tourId) {
    return await Inquiry.find({ tourId }).sort({ createdAt: -1 });
  }
}

const inquiryService = new InquiryService();
export default inquiryService; 