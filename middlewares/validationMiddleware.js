import { HTTP_STATUS_CODES } from '../constants/statusCodes.js';
import { responseUtility } from '../utils/index.js';

const validationMiddleware = schema => (req, res, next) => {
  try {
    const parsedData = schema.parse({
      ...req.body,
      ...req.params,
      ...req.query,
    });
    req.validated = parsedData;
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      let parsedErrors = [];

      if (error.errors) {
        parsedErrors = error.errors;
      } else {
        try {
          parsedErrors = JSON.parse(error.message);
        } catch {
          parsedErrors = [{ path: [], message: error.message }];
        }
      }

      return responseUtility.sendResponse(res, {
        code: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: parsedErrors?.map(err => err?.message).join(' , '),
        errors: parsedErrors?.map(err => ({
          field: err.path?.join('.') || 'unknown',
          message: err.message,
        })),
      });
    }

    return next(error);
  }
};

export { validationMiddleware };
