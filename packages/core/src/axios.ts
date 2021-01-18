import { FeathersErrorJSON } from '@feathersjs/errors'
import { AnyObject, ANYTHING } from '@flex-development/json/utils/types'
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import rateLimit from 'axios-rate-limit'
import isPlainObject from 'lodash/isPlainObject'
import createError from './utils/createError'

/**
 * @file Axios Configuration
 * @module axios
 * @see {@link https://github.com/axios/axios}
 */

/**
 * Transforms an Axios error into a Feathers Error.
 *
 * @param error - Error to transform
 * @throws {FeathersErrorJSON}
 */
const handleErrorResponse = (error: AxiosError): void => {
  const { config = {}, message, request, response, stack } = error

  let feathersError = {} as FeathersErrorJSON

  if (response) {
    // The request was made and the server responded with a status code
    const { data, status } = response as AxiosResponse<AnyObject>

    feathersError = createError(message, data, status)
  } else if (request) {
    // The request was made but no response was received
    feathersError = createError('No response received.')
  } else {
    // Something happened in setting up the request that triggered an error
    feathersError = createError(message, { errors: { stack } })
  }

  if (isPlainObject(feathersError.data)) feathersError.data.config = config

  throw feathersError
}

/**
 * Returns the data from a successful request.
 *
 * @param response - Success response
 * @throws {FeathersError}
 */
const handleSuccessResponse = (res: AxiosResponse): ANYTHING => {
  return res?.data ?? res
}

Axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse)

export const RateLimitedAxios = rateLimit(Axios, {
  maxRPS: 2,
  maxRequests: 2,
  perMilliseconds: 1000
})

/**
 * Passes the request config to our configured Axios client. Used to properly
 * type response data when using {@link handleSuccessResponse}.
 *
 * @param config - Axios request config
 * @param limit - If true, apply rate limit of 2 requests per second
 * @throws {FeathersError}
 */
export async function axios<T = ANYTHING>(
  config: AxiosRequestConfig,
  limit = false
): Promise<T> {
  let response: ANYTHING = null

  if (limit) {
    response = await RateLimitedAxios(config)
  } else {
    response = await Axios(config)
  }

  return (response as unknown) as Promise<T>
}

export default Axios
