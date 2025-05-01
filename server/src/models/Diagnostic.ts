import mongoose from 'mongoose';

export interface IDiagnostic extends mongoose.Document {
  vehicleId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  issues: Array<{
    code: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    system: string;
  }>;
  recommendedActions: string[];
  summary: string;
  detailedReport?: string;
}

const diagnosticSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  issues: [{
    code: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: true
    },
    system: {
      type: String,
      required: true
    }
  }],
  recommendedActions: [{
    type: String
  }],
  summary: {
    type: String
  },
  detailedReport: {
    type: String
  }
}, {
  timestamps: true
});

export const Diagnostic = mongoose.model<IDiagnostic>('Diagnostic', diagnosticSchema);
