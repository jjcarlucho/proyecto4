import mongoose from 'mongoose';

export interface IVehicle extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate?: string;
  mileage: number;
  lastDiagnostic?: Date;
}

const vehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  vin: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  licensePlate: {
    type: String,
    trim: true
  },
  mileage: {
    type: Number,
    required: true
  },
  lastDiagnostic: {
    type: Date
  }
}, {
  timestamps: true
});

export const Vehicle = mongoose.model<IVehicle>('Vehicle', vehicleSchema);
