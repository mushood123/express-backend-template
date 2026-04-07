import cors from 'cors';
import express from 'express';
import { API_VERSION, FRONTEND_URL, PORT, PREFIX } from './config/env.js';
import { logger } from './config/logger.js';
import { requestLogger } from './middlewares/index.js';
import { routes } from './routes/index.js';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [FRONTEND_URL],
  }),
);
app.use(requestLogger);
routes(PREFIX, API_VERSION, app);

if (PORT === undefined) {
  throw new Error('PORT is not defined in environment variables');
}

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
