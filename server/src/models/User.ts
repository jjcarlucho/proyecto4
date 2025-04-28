import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  shopName: string;
  role: 'user' | 'admin' | 'super_admin';
  plan: 'starter' | 'professional' | 'enterprise';
  subscription: {
    status: 'active' | 'cancelled' | 'expired' | 'trial';
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    trialEnd?: Date;
  };
  diagnosticsCount: number;
  monthlyDiagnosticsReset: Date;
  settings: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
  createdAt: Date;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  shopName: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'super_admin'], default: 'user' },
  plan: { type: String, enum: ['starter', 'professional', 'enterprise'], default: 'starter' },
  subscription: {
    status: { type: String, enum: ['active', 'cancelled', 'expired', 'trial'], default: 'trial' },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    trialEnd: Date
  },
  diagnosticsCount: { type: Number, default: 0 },
  monthlyDiagnosticsReset: { type: Date, default: Date.now },
  settings: {
    notifications: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: false },
    language: { type: String, default: 'en' }
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', UserSchema); 