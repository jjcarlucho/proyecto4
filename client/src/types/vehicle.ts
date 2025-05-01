export interface Vehicle {
  _id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate?: string;
  mileage: number;
  lastDiagnostic?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFormData {
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate?: string;
  mileage: number;
}
