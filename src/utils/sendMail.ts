import { Job } from 'bull';
import nodemailer from 'nodemailer';

import ENV from '../config/env';
import { mailQueue } from './mailQueue';

export interface MailData {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = (mailData: MailData) => {
  mailQueue.add(mailData, { attempts: 3 });
};

const emailProcessor = async ({ data }: Job<MailData>) => {
  try {
    const transporter = nodemailer.createTransport({
      service: ENV.MAIL_SERVICE,
      host: ENV.MAIL_HOST,
      port: Number(ENV.MAIL_PORT),
      secure: ENV.MAIL_SECURITY === 'true',
      auth: {
        user: ENV.MAIL_USER,
        pass: ENV.MAIL_PASS,
      },
    });

    const response = await transporter.sendMail({
      from: {
        name: ENV.MAIL_FROM as string,
        address: ENV.MAIL_USER as string,
      },
      ...data,
    });

    console.log('✉️  Activation email sent to -> ', response.envelope.to.at(0), '\n');
  } catch (error) {
    console.log('❌ Error sending mail :\n', error, '\n\n');
    throw error;
  }
};

export default emailProcessor;
