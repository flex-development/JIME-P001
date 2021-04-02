import type { AnyObject } from '@flex-development/json'
import type { AxiosError, DynamicError } from '../../types'
import createError from '../createError'

/**
 * @file Implementation - onRejected
 * @module utils/onRejected
 */

/**
 * Transforms an `AxiosError` into an `ErrorJSON` object.
 *
 * @param {AxiosError} error - HTTP error to transform
 * @throws {ErrorJSON}
 */
const onRejected = (error: AxiosError): void => {
  const { isAxiosError, message, request, response } = error

  let $error: DynamicError | string = ''
  let data: AnyObject = { ...error.toJSON(), isAxiosError }
  let status = 500

  if (response) {
    // The request was made and the server responded with a status code
    $error = response.data?.className ? response.data : message
    data = { ...data, headers: response.headers }
    status = response.status
  } else if (request) {
    // The request was made but no response was received
    $error = 'No response received.'
    data = { ...data, $message: message, message: $error }
  } else {
    // Something happened in setting up the request that triggered an error
    $error = error
  }

  throw createError($error, data, status)
}

export default onRejected
