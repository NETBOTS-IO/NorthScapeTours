import Car from "../models/rentModel.js";

const getImageUrls = (files) => {
  if (!files || !files.carImage) return [];
  return files.carImage.map(file => `/uploads/rent/${file.filename}`);
};

// 📌 CREATE CAR
export const createCar = async (req, res) => {
  try {
    const { carName, carModel, pricePerDay, transmission, fuelType, seats, driverName } = req.body;

    // Handle uploaded images
    if (req.files && req.files.carImage) {
      req.body.carImage = getImageUrls(req.files);
    }
    // If carImage is a string (single image from form), convert to array
    if (typeof req.body.carImage === 'string') {
      req.body.carImage = [req.body.carImage];
    }

    const newCar = new Car({
      carName,
      carModel,
      pricePerDay,
      transmission,
      fuelType,
      seats,
      driverName,
      carImage: req.body.carImage
    });
    await newCar.save();
    res.status(201).json({ message: "Car created successfully", car: newCar });
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
};

// 📌 GET ALL CARS
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 GET SINGLE CAR
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update car
export const updateCar = async (req, res) => {
  try {
    const {
      carName,
      carModel,
      pricePerDay,
      transmission,
      fuelType,
      seats,
      driverName
    } = req.body;
    
    let updatedData = {
      carName,
      carModel,
      pricePerDay,
      transmission,
      fuelType,
      seats,
      driverName
    };

    if (req.file) {
      updatedData.carImage = `/uploads/${req.file.filename}`;
    }


    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true, runValidators: true } 
    );

    if (!car) return res.status(404).json({ message: "Car not found" });

    res.json({ message: "Car updated successfully", data: car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📌 DELETE CAR
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
