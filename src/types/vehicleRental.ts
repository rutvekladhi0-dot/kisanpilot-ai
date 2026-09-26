export type VehicleCategory =
  | 'tractor'
  | 'lorry'
  | 'trailer'
  | 'tractor-machine'
  | 'drone'
  | 'sprinkler';

export type RentalDurationType = 'daily' | 'monthly' | 'yearly';

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  category: VehicleCategory;
  categoryLabel: string;
  image: string;
  location: string;
  village: string;
  district: string;
  distanceKm: number;
  available: boolean;
  availabilityText: string;
  rating: number;
  reviewsCount: number;
  ownerName: string;
  ownerPhone: string;
  ownerRating: number;
  verifiedOwner: boolean;
  rates: {
    daily: number;
    monthly: number;
    yearly: number;
  };
  condition: string;
  fuelType: string;
  fuelPolicy: string;
  horsepower?: string;
  loadCapacity?: string;
  features: string[];
  usageConditions: string[];
  requiredDocuments: string[];
  securityDeposit: string;
  availableDates: string;
}

export interface RentalBooking {
  id: string;
  bookingId: string;
  vehicle: Vehicle;
  pickupLocation: string;
  destination?: string;
  durationType: RentalDurationType;
  durationUnits: number;
  startDate: string;
  endDate: string;
  totalCost: number;
  depositAmount: string;
  farmerName: string;
  farmerPhone: string;
  status: 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';
  createdAt: string;
}
