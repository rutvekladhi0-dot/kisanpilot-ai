export type StorageFacilityType = 'cold' | 'warm';

export interface StorageChamberSensor {
  chamberId: string;
  chamberName: string;
  type: StorageFacilityType;
  currentTempC: number;
  currentHumidityPercent: number;
  targetTempC: number;
  targetHumidityPercent: number;
  status: 'optimal' | 'warning' | 'critical';
  alertMessage?: string;
  lastUpdated: string;
}

export interface StorageFacilityItem {
  available: boolean;
  capacityMT: number;
  availableMT: number;
  temperatureRange: {
    min: number;
    max: number;
    unit: string;
  };
  humidityRange: {
    min: number;
    max: number;
    unit: string;
  };
  supportedCrops: string[];
  chambersCount: number;
  technologyType: string;
}

export interface StorageCenter {
  id: string;
  name: string;
  operatorName: string;
  verifiedPartner: boolean;
  isDemo?: boolean;
  wdraRegistrationNo?: string;
  fssaiLicenseNo?: string;
  isoCertified?: string;
  
  // Location
  address: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  pinCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  
  // Dynamic or computed distance
  distanceKm?: number;
  travelTimeMins?: number;

  // Contact
  contact: {
    phone: string;
    altPhone?: string;
    email?: string;
    managerName: string;
    operatingHours: string;
  };

  // Road & Accessibility
  roadAccess: {
    highwayDistanceKm: number;
    entryRoadWidthMeters: number;
    maxVehicleAccess: string;
    heightClearanceMeters: number;
    loadingDocksCount: number;
    weighbridgeCapacityTonnes: number;
  };

  // Facilities
  facilities: {
    coldStorage: StorageFacilityItem;
    warmStorage: StorageFacilityItem;
  };

  // IoT Sensor Telemetry
  iotSensors: {
    enabled: boolean;
    isLive: boolean;
    lastSync: string;
    chambers: StorageChamberSensor[];
  };

  // Hygiene & Safety
  hygieneAndSafety: {
    pestControlDate: string;
    cleaningSchedule: string;
    fumigationCertified: boolean;
    cctvSurveillance: boolean;
    fireSafetySystem: string;
    insuranceCoverage: string;
    cropSegregationStrict: boolean;
    certifications: string[];
  };

  // Pricing
  pricing: {
    coldStoragePerQuintalPerMonth?: number;
    warmStoragePerQuintalPerMonth?: number;
    minimumStorageDays: number;
    loadingUnloadingRatePerBag?: number;
    insuranceFeeIncluded: boolean;
  };

  // Visuals & Social Proof
  images: string[];
  rating: number;
  reviewsCount: number;
}

export interface StorageBookingRequest {
  id: string;
  bookingId: string;
  farmerName: string;
  farmerPhone: string;
  village: string;
  district: string;
  state: string;
  centerId: string;
  centerName: string;
  storageType: StorageFacilityType;
  cropName: string;
  cropVariety?: string;
  quantityTonnes: number;
  quantityBags?: number;
  arrivalDate: string;
  durationDays: number;
  estimatedCost: number;
  status: 'pending' | 'approved' | 'stored' | 'completed' | 'rejected';
  createdAt: string;
  chamberAssigned?: string;
  receiptId?: string;
  notes?: string;
}

export interface CropStorageGuide {
  cropName: string;
  cropNameHi: string;
  cropNameMr: string;
  category: 'fruits' | 'vegetables' | 'grains' | 'pulses' | 'spices' | 'oilseeds';
  recommendedStorageType: StorageFacilityType;
  minTempC: number;
  maxTempC: number;
  minHumidityPercent: number;
  maxHumidityPercent: number;
  maxStorageMonths: number;
  precautions: string[];
}

export interface IndiaStateDirectory {
  stateName: string;
  stateCode: string;
  hasActivePartners: boolean;
  districts: {
    name: string;
    hasActivePartners: boolean;
    partnerCount: number;
  }[];
}
