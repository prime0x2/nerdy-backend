import type { Request, Response, NextFunction } from 'express';

import ENV from '../config/env';
import AppError from '../utils/appError';

export const sendDevError = (err: AppError, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: err.stack,
  });
};

export const sendProdError = (err: AppError, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log('\n🚨 ', err, '\n');

  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (ENV.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else if (ENV.NODE_ENV === 'production') {
    sendProdError(err, res);
  }
};

export const invalidRouteHandler = (req: Request, res: Response, next: NextFunction) => {
  const message = `Cannot find ${req.originalUrl} on this server!`;

  const err = new AppError(404, message);
  next(err);
};
