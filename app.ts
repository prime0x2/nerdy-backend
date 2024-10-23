import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import ENV from './src/config/env';
import connectDB from './src/config/db';
import router from './src/routes/index.routes';
import { mailWorker } from './src/workers/mail.worker';
import { errorHandler, invalidRouteHandler } from './src/middlewares/error.middleware';

const app = express();

/* -------- Middleware -------- */

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------- Routes -------- */

app.use('/api', router);

/* -------- Error Handling -------- */

app.use(invalidRouteHandler);
app.use(errorHandler);

/* -------- Server -------- */

const server = http.createServer(app);

connectDB().then(() => {
  mailWorker();

  server.listen(ENV.PORT, () => {
    console.log(`🚀 Server is running on port ${ENV.PORT}`);
    console.log(`🚀 API is running on http://localhost:${ENV.PORT}/api`);
  });
});
