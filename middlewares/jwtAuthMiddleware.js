import { HTTP_STATUS_CODES, MESSAGES } from '../constants/index.js';
import { JwtUtility, responseUtility } from '../utils/index.js';

const jwtAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return responseUtility.sendResponse(res, {
        code: HTTP_STATUS_CODES.UNAUTHORIZED,
        message: MESSAGES.UNAUTHORIZED,
        errors: 'No Token Found',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = JwtUtility.verifyToken(token);

    req.userId = decoded.userId;

    return next();
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    return responseUtility.sendResponse(res, {
      code: HTTP_STATUS_CODES.UNAUTHORIZED,
      message: MESSAGES.UNAUTHORIZED,
      errors: err,
    });
  }
};

export { jwtAuthMiddleware };
