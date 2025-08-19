import { HTTP_STATUS_CODES, MESSAGES } from '../constants/index.js'

class responseUtility {
  static async sendResponse(res, response) {
    if (response.status == false) {
      return this.noSuccessResponse(res, response?.message)
    } else if (response.status == true) {
      return this.successResponse(res, response.message, {
        data: response.data
      })
    } else {
      return this.validationErrorResponse(res, response?.message)
    }
  }
  static async validationErrorResponse(res, errors) {
    res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
      status: false,
      error: errors,
      message: MESSAGES.VALIDATION_ERROR
    })
  }

  static async badRequestErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
      status: false,
      message: message ?? MESSAGES.VALIDATION_ERROR
    })
  }

  static async authorizationErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({
      status: false,
      message: message ?? MESSAGES.UNAUTHORIZED
    })
  }

  static async manyRequestErrorResponse(res, message) {
    res.status(HTTP_STATUS_CODES.TOO_MANY_REQUESTS).send({
      status: false,
      message: message ?? MESSAGES.TOO_MANY_REQUESTS
    })
  }

  static async validationFailResponse(res, message, result) {
    const response = {
      status: false,
      message: message ?? MESSAGES.VALIDATION_FAILED
    }
    if (result) {
      response.result = result
    }
    res.status(HTTP_STATUS_CODES.VALIDATION_FAILED).send(response)
  }

  static async successResponse(res, message, result) {
    const response = {
      status: true,
      message: message ?? MESSAGES.SUCCESS
    }
    if (result) {
      response.result = result
    }
    res.status(HTTP_STATUS_CODES.OK).send(response)
  }

  static async noSuccessResponse(res, message, result) {
    const response = {
      status: false,
      message: message ?? MESSAGES.FAILURE
    }
    if (result) {
      response.result = result
    }
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).send(response)
  }

  static async errorResponse(res, message) {
    const response = {
      status: false,
      message: message ?? MESSAGES.SERVER_ERROR
    }
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(response)
  }
}

export { responseUtility }
