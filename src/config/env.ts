import * as dotenv from "dotenv";

dotenv.config();

const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/nerd-devs",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",
};

export default ENV;
