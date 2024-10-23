import { Request, Response, NextFunction } from 'express';

import ENV from '../config/env';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import UserModel from '../schema/user.schema';
import templateParser from '../utils/templateParser';

import { sendMail } from '../utils/sendMail';
import { getReadableExpiration } from '../utils/helper';
import { generateToken, verifyToken } from '../config/jwt';

export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password, mobileNumber } = req.body;

  const exist = await UserModel.findOne({ email });
  if (exist) {
    return next(new AppError(409, 'Email is already registered'));
  }

  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
  });

  if (user) {
    const token = generateToken({ email }, ENV.MAIL_TOKEN_EXPIRY);
    const activationLink = `${ENV.CORS_ORIGIN}/verify?token=${token}`;

    const template = await templateParser({
      firstName,
      activationLink,
      expiresIn: getReadableExpiration(ENV.MAIL_TOKEN_EXPIRY),
    });
    sendMail({
      to: email,
      subject: 'Email Verification',
      html: template,
    });
  }

  res.status(201).json({
    success: true,
    message:
      'Registration successful. A verification email has been sent to your email address. Please verify your email to activate your account.',
  });
});

export const activateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.query;

  if (!token) {
    return next(new AppError(400, 'No token provided'));
  }

  const decoded = verifyToken(token as string) as { email: string };
  const user = await UserModel.findOne({ email: decoded.email });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  if (user.isEmailVerified) {
    return next(new AppError(400, 'Email is already verified'));
  }

  user.isEmailVerified = true;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Email verification successful',
  });
});

export const requestNewActivationMail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.query;

  if (!email) {
    return next(new AppError(400, 'Please provide email'));
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  if (user.isEmailVerified) {
    return next(new AppError(400, 'Email is already verified'));
  }

  const token = generateToken({ email }, ENV.MAIL_TOKEN_EXPIRY);
  const activationLink = `${ENV.CORS_ORIGIN}/verify?token=${token}`;

  const template = await templateParser({
    firstName: user.firstName,
    activationLink,
    expiresIn: getReadableExpiration(ENV.MAIL_TOKEN_EXPIRY),
  });
  sendMail({
    to: email as string,
    subject: 'Email Verification',
    html: template,
  });

  res.status(200).json({
    success: true,
    message: 'A new verification email has been sent to your email address',
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(400, 'Please provide email and password'));
  }

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user || !(await user.isValidPassword(password))) {
    return next(new AppError(401, 'Incorrect email or password'));
  }

  if (!user.isEmailVerified) {
    return next(new AppError(401, 'Please verify your email to activate your account before logging in'));
  }

  res.status(200).json({
    success: true,
    message: 'Login successful',
  });
});
