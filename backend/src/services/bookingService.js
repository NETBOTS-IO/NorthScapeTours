import Booking from "../models/bookingModel.js";
import { calculateReadTime } from "../utils/readTimeCalculator.js";

class BookingsServices {

  async getAllBookings(query = {}) {
    const {
      page = 1,
      limit = 10,
      search,
      status = "",
    } = query;

    const filter = {};

    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { carName: { $regex: search, $options: "i" } },
        { carModel: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    const total = await Booking.countDocuments(filter);

    return {
      bookings,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
    };
  }


}

const bookingsServices = new BookingsServices();
export default bookingsServices;
