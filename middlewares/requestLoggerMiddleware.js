import { logger } from '../config/logger.js';

export const requestLogger = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  const start = Date.now();

  logger.info({
    msg: 'Incoming request',
    method: req.method,
    url: req.originalUrl,
  });

  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.info({
      msg: 'Request completed',
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      query: req.query,
      params: req.params,
      body: req.body,
      file: req.file ? true : undefined,
      files: req.files ? true : undefined,
    });
  });

  next();
};
