import { HTTP_STATUS_CODES, MESSAGES } from '../constants/index.js';
import { prisma } from '../database/database.js';
import { responseUtility } from '../utils/index.js';

const adminCheckMiddleware = async (req, res, next) => {
  try {
    const userId = req?.userId;

    if (!userId) {
      return responseUtility.sendResponse(res, {
        code: HTTP_STATUS_CODES.UNAUTHORIZED,
        message: MESSAGES.UNAUTHORIZED,
        errors: 'User not found in request',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return responseUtility.sendResponse(res, {
        code: HTTP_STATUS_CODES.UNAUTHORIZED,
        message: MESSAGES.UNAUTHORIZED,
        errors: 'User does not exist',
      });
    }

    if (user.role !== 'ADMIN') {
      return responseUtility.sendResponse(res, {
        code: HTTP_STATUS_CODES.FORBIDDEN,
        message: 'Forbidden',
        errors: 'Admin access required',
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    return responseUtility.sendResponse(res, {
      code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Server Error',
      errors: err,
    });
  }
};

export { adminCheckMiddleware };
