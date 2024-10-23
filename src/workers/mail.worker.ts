import { Job } from 'bull';

import { mailQueue } from '../utils/mailQueue';
import emailProcessor, { MailData } from '../utils/sendMail';

const handleFailure = (job: Job<MailData>, error: Error) => {
  if (job.attemptsMade >= (job.opts.attempts || 0)) {
    console.log(`Job failures above threshold in ${job.queue.name} for: ${JSON.stringify(job.data)}`, error);
    job.remove();
    return null;
  }

  console.log(
    `Job in ${job.queue.name} failed for: ${JSON.stringify(job.data)} with ${error.message}. ${(job.opts.attempts || 0) - job.attemptsMade} attempts left`
  );
};

const handleCompleted = (job: Job<MailData>) => {
  job.remove();
};

const handleStalled = (job: Job<MailData>) => {
  console.log(`Job in ${job.queue.name} stalled for: ${JSON.stringify(job.data)}`);
};

export const mailWorker = () => {
  try {
    mailQueue.process((job: Job<MailData>) => {
      console.log(`\n⏳ Sending email to -> ${job.data.to}`);
      return emailProcessor(job);
    });
    mailQueue.on('failed', handleFailure);
    mailQueue.on('completed', handleCompleted);
    mailQueue.on('stalled', handleStalled);

    console.log('🗄️  Mail Queue worker started');
  } catch (error) {
    console.log('❌ Error starting mail worker: ', error);
  }
};
