import express from 'express';
import { PORT, API_VERSION, PREFIX } from './config/env.js';
import { routes } from './routes/index.js';
import { requestLogger } from './middlewares/index.js';

const app = express();
app.use(express.json());
app.use(requestLogger()); // detailed request/response logger (redacts sensitive fields)

routes(PREFIX, API_VERSION, app);

if (PORT === undefined) {
  throw new Error('PORT is not defined in environment variables');
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\x1b[33m🚀 Server is running on port ${PORT}\x1b[0m`);
});
