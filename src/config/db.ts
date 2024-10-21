import mongoose from 'mongoose';

import ENV from './env';

const connectDB = async (): Promise<void> => {
  try {
    if (!ENV.MONGO_URI) {
      throw new Error('❌ MongoDB Database URI not found...!');
    }

    mongoose.set('strictQuery', true);

    await mongoose.connect(ENV.MONGO_URI);
    console.log('🏭 Connected to MongoDB database!');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:\n', error);
    process.exit(1);
  }
};

export default connectDB;
