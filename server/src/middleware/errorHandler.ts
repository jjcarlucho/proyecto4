import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error(`${err.statusCode} - ${err.message}`);
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // Error de MongoDB
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Token inválido. Por favor inicie sesión nuevamente.'
    });
  }

  // Log unexpected errors
  logger.error('Unexpected error:', err);

  // Send generic error response
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}; 