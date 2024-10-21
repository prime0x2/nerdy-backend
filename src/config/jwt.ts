import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

import ENV from "./env";
import AppError from "../utils/appError";

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRY });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError(401, "Token expired. Please login again.");
    } else {
      throw new AppError(401, "Invalid token. Please login again.");
    }
  }
};
