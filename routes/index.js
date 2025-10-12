import { HTTP_STATUS_CODES, MESSAGES, STATUS } from '../constants/index.js';
import { AuthRouter } from './auth/index.js';

const routes = (PREFIX, API_VERSION, app) => {
  app.use(`/${PREFIX}/${API_VERSION}/auth`, AuthRouter);
  app.use(`/${PREFIX}/${API_VERSION}/health`, (req, res) => {
    res.status(HTTP_STATUS_CODES.OK).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.HEALTH_CHECK,
    });
  });
};

export { routes };
