import { Schema, model, Document, Types } from 'mongoose';

export interface IDiagnostic extends Document {
  userId: Types.ObjectId;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    vin: string;
    mileage: number;
    engine: string;
  };
  symptoms: string[];
  dtcCodes: string[];
  diagnosis: {
    problems: {
      title: string;
      description: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      probability: number;
      partsNeeded: {
        name: string;
        partNumber: string;
        estimatedCost: number;
      }[];
      laborTime: number;
      laborCost: number;
      totalCost: number;
    }[];
    aiConfidence: number;
    recommendations: string[];
  };
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  report?: {
    generatedAt?: Date;
    pdfUrl?: string;
    customerNotes?: string;
  };
}

const DiagnosticSchema = new Schema<IDiagnostic>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleInfo: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    vin: { type: String, required: true },
    mileage: { type: Number, required: true },
    engine: { type: String, required: true }
  },
  symptoms: [{ type: String, required: true }],
  dtcCodes: [{ type: String }],
  diagnosis: {
    problems: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      severity: { 
        type: String, 
        enum: ['low', 'medium', 'high', 'critical'],
        required: true 
      },
      probability: { type: Number, required: true },
      partsNeeded: [{
        name: { type: String, required: true },
        partNumber: { type: String, required: true },
        estimatedCost: { type: Number, required: true }
      }],
      laborTime: { type: Number, required: true },
      laborCost: { type: Number, required: true },
      totalCost: { type: Number, required: true }
    }],
    aiConfidence: { type: Number, required: true },
    recommendations: [{ type: String }]
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  report: {
    generatedAt: Date,
    pdfUrl: String,
    customerNotes: String
  }
});

// Indexes for better query performance
DiagnosticSchema.index({ userId: 1, createdAt: -1 });
DiagnosticSchema.index({ 'vehicleInfo.vin': 1 });
DiagnosticSchema.index({ status: 1 });

export const Diagnostic = model<IDiagnostic>('Diagnostic', DiagnosticSchema); 