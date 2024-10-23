import Bull from 'bull';
import ENV from '../config/env';

export const mailQueue = new Bull('email', {
  redis: ENV.REDIS_URI,
});
