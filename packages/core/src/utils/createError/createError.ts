import {
  BadGateway,
  BadRequest,
  Conflict,
  FeathersError,
  FeathersErrorJSON,
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
import { AnyObject } from '@flex-development/json/utils/types'

/**
 * @file Creates a Feathers error
 * @module utils/createError/impl
 * @see https://docs.feathersjs.com/api/errors.html
 */

/**
 * Creates a new Feathers error based on the status argument.
 *
 * @param error - Error to transform or error message
 * @param data - Additional error data
 * @param data.errors - Typically validation errors or if you want to group
 * multiple errors together
 * @param status - Error status code. Defaults to 500
 * @return {FeathersErrorJSON}
 */
const createError = (
  error?: string | Error,
  data: AnyObject = {},
  status: number | string = 500
): FeathersErrorJSON => {
  if (typeof status === 'string') status = JSON.parse(status)

  switch (status) {
    case 400:
      error = new BadRequest(error, data)
      break
    case 401:
      error = new NotAuthenticated(error, data)
      break
    case 402:
      error = new PaymentError(error, data)
      break
    case 403:
      error = new Forbidden(error, data)
      break
    case 404:
      error = new NotFound(error, data)
      break
    case 405:
      error = new MethodNotAllowed(error, data)
      break
    case 406:
      error = new NotAcceptable(error, data)
      break
    case 408:
      error = new Timeout(error, data)
      break
    case 409:
      error = new Conflict(error, data)
      break
    case 411:
      error = new LengthRequired(error, data)
      break
    case 422:
      error = new Unprocessable(error, data)
      break
    case 429:
      error = new TooManyRequests(error, data)
      break
    case 501:
      error = new NotImplemented(error, data)
      break
    case 502:
      error = new BadGateway(error, data)
      break
    case 503:
      error = new Unavailable(error, data)
      break
    default:
      error = new GeneralError(error, data)
  }

  return (error as FeathersError).toJSON()
}

export default createError
