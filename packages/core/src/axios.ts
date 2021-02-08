import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject, ANYTHING } from '@flex-development/json/utils/types'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Axios from 'axios'
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
 * @param e - Error to transform
 * @throws {FeathersErrorJSON}
 */
const handleErrorResponse = (e: AxiosError): void => {
  const { config = {}, message, request, response } = e

  let error = {} as FeathersErrorJSON

  if (response) {
    // The request was made and the server responded with a status code
    const { data, status } = response as AxiosResponse<AnyObject>
    const err = data as FeathersErrorJSON
    const $data = isPlainObject(data) ? data : { data }

    error = err.className ? err : createError(message, $data, status)
  } else if (request) {
    // The request was made but no response was received
    error = createError('No response received.')
  } else {
    // Something happened in setting up the request that triggered an error
    error = createError(e)
  }

  error.data.config = config

  throw error
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
