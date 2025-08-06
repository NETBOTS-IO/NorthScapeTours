// define types for rent car
export interface RentCar {
  _id: string;
  carName: string;
  carModel: string;
  pricePerDay: number;
  transmission: string;
  fuelType: string;
  seats: number;
  driverName: string;
  carImage: string;
  createdAt?: string;
  updatedAt?: string;
  status?:string
}