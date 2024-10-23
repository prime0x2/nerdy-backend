import { Request, Response, NextFunction } from 'express';

import ENV from '../config/env';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import UserModel from '../schema/user.schema';
import templateParser from '../utils/templateParser';

import { sendMail } from '../utils/sendMail';
import { getReadableExpiration } from '../utils/helper';
import { generateToken } from '../config/jwt';

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
    const token = btoa(generateToken({ email }, ENV.MAIL_TOKEN_EXPIRY));
    const activationLink = `${req.protocol}://${req.get('host')}/api/auth/activate?token=${token}`;

    const template = await templateParser({
      firstName,
      activationLink,
      expiresIn: getReadableExpiration(ENV.MAIL_TOKEN_EXPIRY as string),
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
