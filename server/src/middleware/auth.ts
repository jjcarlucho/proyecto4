import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../models/User';
import { AppError } from './errorHandler';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new AppError('No token provided', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      throw new AppError('User not found', 401);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Not authorized', 401));
  }
};

// Role-based access control middleware
export const roleCheck = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authorized', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Access denied', 403));
    }

    next();
  };
};

// Plan-based access control middleware
export const planCheck = (...plans: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authorized', 401));
    }

    if (!plans.includes(req.user.plan)) {
      return next(new AppError('Upgrade required', 403));
    }

    next();
  };
};

// Subscription status check middleware
export const subscriptionCheck = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError('Not authorized', 401));
  }

  const { subscription } = req.user;

  if (subscription.status !== 'active' && subscription.status !== 'trial') {
    return next(new AppError('Subscription required', 403));
  }

  if (subscription.status === 'trial' && subscription.trialEnd && new Date() > subscription.trialEnd) {
    return next(new AppError('Trial period expired', 403));
  }

  next();
}; 