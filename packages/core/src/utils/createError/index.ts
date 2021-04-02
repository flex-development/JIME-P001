import { errors } from '@feathersjs/errors'
import type { AnyObject } from '@flex-development/json'
import merge from 'lodash/merge'
import type {
  DynamicError,
  ErrorJSON,
  ErrorStatusCode,
  FeathersErrorJSON
} from '../../types'

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
 * @param {DynamicError | FeathersErrorJSON | string} error - Error to transform
 * @param {AnyObject} [data] - Additional error data
 * @param {AnyObject} [data.errors] - Validation errors or group of errors
 * @param {ErrorStatusCode | keyof typeof ErrorStatusCode} [status] - Status
 * code or name of type of error to create
 * @return {ErrorJSON} Formatted error object
 */
const createError = (
  error: DynamicError | FeathersErrorJSON | string = 'Unknown error',
  data: AnyObject = {},
  status: ErrorStatusCode | keyof typeof ErrorStatusCode = 500
): ErrorJSON => {
  if ((error as ErrorJSON).className) return merge(error, { data }) as ErrorJSON

  if (typeof error === 'string') error = new Error(error)

  const {
    name,
    message,
    stack,
    status: estatus,
    statusCode
  } = error as DynamicError

  status = JSON.parse(`${statusCode || estatus || status}`)

  data.name = name
  data.stack = stack

  return new errors[status](message, data).toJSON()
}

export default createError
