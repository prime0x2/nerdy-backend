import * as dotenv from 'dotenv';

dotenv.config();

const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,

  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/nerd-devs',
  REDIS_URI: process.env.REDIS_URI || 'redis://localhost:6379',

  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',

  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_SECURITY: process.env.MAIL_SECURITY,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_TOKEN_EXPIRY: process.env.MAIL_TOKEN_EXPIRY,
};

export default ENV;
