import { Request, Response, NextFunction } from 'express';
import moment from 'moment';

import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import TicketModel, { ITicket } from '../schema/ticket.schema';

export const createTicket = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { userID, date, deviceID, queryText } = req.body;

  const lastTicket = await TicketModel.find({ userID }).sort({ createdAt: -1 }).limit(1);
  if (lastTicket.length > 0) {
    const lastTicketDate = moment(lastTicket[0].createdAt);
    const currentDate = moment();
    const minutes = currentDate.diff(lastTicketDate, 'minutes');

    if (minutes <= 30) {
      return next(
        new AppError(
          409,
          'You have already placed a support ticket. Please wait at least one hour before sending another request'
        )
      );
    }
  }

  const ticket: ITicket = await TicketModel.create({
    userID,
    date,
    deviceID,
    queryText,
  });

  res.status(200).json({
    data: {
      _id: ticket._id,
    },
  });
});
