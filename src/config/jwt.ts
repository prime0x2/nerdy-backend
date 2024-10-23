import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import ENV from './env';
import AppError from '../utils/appError';

export const generateToken = (payload: JwtPayload, expiresIn: string = ENV.JWT_EXPIRY) => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError(401, 'This token has expired.');
    } else {
      throw new AppError(401, 'This token is invalid.');
    }
  }
};
