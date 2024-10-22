import mongoose, { Document } from 'mongoose';

export interface ITicket extends Document {
  userID: string;
  date: Date;
  deviceID: string;
  queryText: string;
  createdAt: Date;
  updatedAt: Date;
}

const ticketSchema = new mongoose.Schema<ITicket>(
  {
    userID: {
      type: String,
      required: [true, 'User ID is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    deviceID: {
      type: String,
      required: [true, 'Device ID is required'],
    },
    queryText: {
      type: String,
      required: [true, 'Query Text is required'],
    },
  },
  { timestamps: true }
);

const TicketModel = mongoose.model('Ticket', ticketSchema);

export default TicketModel;
