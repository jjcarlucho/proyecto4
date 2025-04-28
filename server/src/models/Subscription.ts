import { Schema, model, Document, Types } from 'mongoose';

export interface ISubscription extends Document {
  userId: Types.ObjectId;
  plan: 'starter' | 'professional' | 'enterprise';
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  paymentHistory: {
    date: Date;
    amount: number;
    invoiceId: string;
    status: string;
  }[];
}

const SubscriptionSchema = new Schema<ISubscription>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { 
    type: String, 
    enum: ['starter', 'professional', 'enterprise'],
    required: true 
  },
  stripeSubscriptionId: String,
  stripeCustomerId: String,
  status: { 
    type: String, 
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  currentPeriodStart: { type: Date, required: true },
  currentPeriodEnd: { type: Date, required: true },
  cancelAtPeriodEnd: { type: Boolean, default: false },
  paymentHistory: [{
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    invoiceId: { type: String, required: true },
    status: { type: String, required: true }
  }]
});

// Indexes for better query performance
SubscriptionSchema.index({ userId: 1 });
SubscriptionSchema.index({ stripeCustomerId: 1 });
SubscriptionSchema.index({ stripeSubscriptionId: 1 });
SubscriptionSchema.index({ status: 1 });

export const Subscription = model<ISubscription>('Subscription', SubscriptionSchema); 