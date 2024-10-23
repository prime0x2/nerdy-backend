import Bull from 'bull';

export const mailQueue = new Bull('email', {
  redis: 'redis://127.0.0.1:6379',
});
