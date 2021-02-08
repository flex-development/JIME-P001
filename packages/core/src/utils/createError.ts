import type { FeathersErrorJSON } from '@feathersjs/errors'
import {
  BadGateway,
  BadRequest,
  Conflict,
  FeathersError,
  Forbidden,
  GeneralError,
  LengthRequired,
  MethodNotAllowed,
  NotAcceptable,
  NotAuthenticated,
  NotFound,
  NotImplemented,
  PaymentError,
  Timeout,
  TooManyRequests,
  Unavailable,
  Unprocessable
} from '@feathersjs/errors'

/**
 * @file Implementation - createError
 * @module utils/createError
 */

/**
 * Returns an error object based on {@param status}.
 *
 * @see https://developer.mozilla.org/docs/Web/HTTP/Status
 * @see https://docs.feathersjs.com/api/errors.html
 *
 * @param error - Error to transform or error message
 * @param data - Additional error data
 * @param data.errors - Validation errors or group of multiple errors
 * @param status - Error status code. Defaults to 500
 */
const createError = (
  error?: string | Error,
  data: Record<string, unknown> = {},
  status: number | string = 500
): FeathersErrorJSON => {
  if (typeof error === 'string') error = { message: error } as Error
  if (typeof status === 'string') status = JSON.parse(status)

  const { name, message, stack } = error as Error

  data.name = name
  data.stack = stack

  switch (status) {
    case 400:
      error = new BadRequest(message, data)
      break
    case 401:
      error = new NotAuthenticated(message, data)
      break
    case 402:
      error = new PaymentError(message, data)
      break
    case 403:
      error = new Forbidden(message, data)
      break
    case 404:
      error = new NotFound(message, data)
      break
    case 405:
      error = new MethodNotAllowed(message, data)
      break
    case 406:
      error = new NotAcceptable(message, data)
      break
    case 408:
      error = new Timeout(message, data)
      break
    case 409:
      error = new Conflict(message, data)
      break
    case 411:
      error = new LengthRequired(message, data)
      break
    case 422:
      error = new Unprocessable(message, data)
      break
    case 429:
      error = new TooManyRequests(message, data)
      break
    case 501:
      error = new NotImplemented(message, data)
      break
    case 502:
      error = new BadGateway(message, data)
      break
    case 503:
      error = new Unavailable(message, data)
      break
    default:
      error = new GeneralError(message, data)
  }

  return (error as FeathersError).toJSON()
}

export default createError
