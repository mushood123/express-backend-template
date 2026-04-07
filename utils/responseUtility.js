/* eslint-disable require-await */
import { HTTP_STATUS_CODES, MESSAGES, STATUS } from '../constants/index.js';

class responseUtility {
  static async sendResponse(res, result) {
    const { message, data = null, code = HTTP_STATUS_CODES.OK, errors = null } = result;

    switch (code) {
      case HTTP_STATUS_CODES.OK:
        return this.successResponse(res, message, data);

      case HTTP_STATUS_CODES.CREATED:
        return this.createdResponse(res, message, data);

      case HTTP_STATUS_CODES.ACCEPTED:
        return this.acceptedResponse(res, message, data);

      case HTTP_STATUS_CODES.NO_CONTENT:
        return this.noContentResponse(res);

      case HTTP_STATUS_CODES.BAD_REQUEST:
        return this.badRequestErrorResponse(res, message, errors);

      case HTTP_STATUS_CODES.UNAUTHORIZED:
        return this.authorizationErrorResponse(res, message, errors);

      case HTTP_STATUS_CODES.FORBIDDEN:
        return this.forbiddenErrorResponse(res, message, errors);

      case HTTP_STATUS_CODES.NOT_FOUND:
        return this.notFoundErrorResponse(res, message);

      case HTTP_STATUS_CODES.METHOD_NOT_ALLOWED:
        return this.methodNotAllowedErrorResponse(res, message);

      case HTTP_STATUS_CODES.REQUEST_TIMEOUT:
        return this.requestTimeoutErrorResponse(res, message);

      case HTTP_STATUS_CODES.CONFLICT:
        return this.conflictErrorResponse(res, message);

      case HTTP_STATUS_CODES.GONE:
        return this.goneErrorResponse(res, message);

      case HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY:
        return this.validationErrorResponse(res, message, errors);

      case HTTP_STATUS_CODES.TOO_MANY_REQUESTS:
        return this.manyRequestErrorResponse(res, message);

      case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
        return this.errorResponse(res, message, errors);

      case HTTP_STATUS_CODES.BAD_GATEWAY:
        return this.badGatewayErrorResponse(res, message);

      case HTTP_STATUS_CODES.SERVICE_UNAVAILABLE:
        return this.serviceUnavailableErrorResponse(res, message);

      case HTTP_STATUS_CODES.GATEWAY_TIMEOUT:
        return this.gatewayTimeoutErrorResponse(res, message);

      default:
        return this.noSuccessResponse(res, message, data);
    }
  }

  static async successResponse(res, message, data) {
    const response = {
      status: STATUS.SUCCESS,
      message: message ?? MESSAGES.SUCCESS,
    };
    if (data) response.data = data;
    res.status(HTTP_STATUS_CODES.OK).send(response);
  }

  static async createdResponse(res, message, data) {
    const response = {
      status: STATUS.SUCCESS,
      message: message ?? MESSAGES.CREATED,
    };
    if (data) response.data = data;
    res.status(HTTP_STATUS_CODES.CREATED).send(response);
  }

  static async acceptedResponse(res, message, data) {
    const response = {
      status: STATUS.SUCCESS,
      message: message ?? MESSAGES.ACCEPTED,
    };
    if (data) response.data = data;
    res.status(HTTP_STATUS_CODES.ACCEPTED).send(response);
  }

  static async noContentResponse(res) {
    res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
  }

  static async badRequestErrorResponse(res, message, errors) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.VALIDATION_ERROR,
      errors,
    });
  }

  static async authorizationErrorResponse(res, message, errors) {
    res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.UNAUTHORIZED,
      errors,
    });
  }

  static async forbiddenErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.FORBIDDEN).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.FORBIDDEN,
    });
  }

  static async notFoundErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.NOT_FOUND,
    });
  }

  static async methodNotAllowedErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.METHOD_NOT_ALLOWED,
    });
  }

  static async requestTimeoutErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.REQUEST_TIMEOUT).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.REQUEST_TIMEOUT,
    });
  }

  static async conflictErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.CONFLICT).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.ALREADY_EXISTS,
    });
  }

  static async goneErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.GONE).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.GONE,
    });
  }

  static async validationErrorResponse(res, message, errors) {
    res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.VALIDATION_ERROR,
      error: errors,
    });
  }

  static async manyRequestErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.TOO_MANY_REQUESTS).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.TOO_MANY_REQUESTS,
    });
  }

  // Call directly when you need the VALIDATION_FAILED response shape
  static async validationFailResponse(res, message, data) {
    const response = {
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.VALIDATION_FAILED,
    };
    if (data) response.data = data;
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(response);
  }

  static async errorResponse(res, message, error) {
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.SERVER_ERROR,
      error,
    });
  }

  static async badGatewayErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.BAD_GATEWAY).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.BAD_GATEWAY,
    });
  }

  static async serviceUnavailableErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.SERVICE_UNAVAILABLE,
    });
  }

  static async gatewayTimeoutErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.GATEWAY_TIMEOUT).send({
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.GATEWAY_TIMEOUT,
    });
  }

  static async noSuccessResponse(res, message, data) {
    const response = {
      status: STATUS.FAILURE,
      message: message ?? MESSAGES.FAILURE,
    };
    if (data) response.data = data;
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(response);
  }
}

export { responseUtility };
