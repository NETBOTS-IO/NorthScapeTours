import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    carModel: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    transmission: { type: String, required: true },
    conditioned: { type: String, required: true },
    mileage: { type: String, default: "Pending"  },
    fuelType: { type: String, required: true },
    seats: { type: Number, required: true },
    driverName: { type: String, required: true },
    carImage: [{ type: String }], 
    status: { type: String, default: "Pending" }, //default pending
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
