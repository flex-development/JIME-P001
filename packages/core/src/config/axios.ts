import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject, ANYTHING } from '@flex-development/json'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import rateLimit from 'axios-rate-limit'
import isPlainObject from 'lodash/isPlainObject'
import createError from '../utils/createError'

/**
 * @file Axios Configuration
 * @module config/axios
 * @see {@link https://github.com/axios/axios}
 */

/**
 * Transforms an Axios error into a Feathers Error.
 *
 * @param {AxiosError} e - HTTP error to transform
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
 * @param {AxiosResponse} res - Success response object
 * @param {ANYTHING} res.data - HTTP payload
 * @return {ANYTHING | AxiosResponse<ANYTHING>} HTTP payload or res object
 */
const handleSuccessResponse = (
  res: AxiosResponse
): ANYTHING | AxiosResponse<ANYTHING> => {
  return res?.data ?? res
}

axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse)

export const RateLimitedAxios = rateLimit(axios, {
  maxRPS: 2,
  maxRequests: 2,
  perMilliseconds: 1000
})

/**
 * Passes the request config to our configured Axios client. Used to properly
 * type response data when using {@link handleSuccessResponse}.
 *
 * @template T - Payload type
 *
 * @param {AxiosRequestConfig} config - Axios request config
 * @param {boolean} limit - If `true`, apply rate limit of 2 requests per second
 * @return {Promise<T>} Promise containing payload or res object
 * @throws {FeathersErrorJSON}
 */
export async function request<T = ANYTHING>(
  config: AxiosRequestConfig,
  limit: boolean = false
): Promise<T> {
  let response: ANYTHING = null

  if (limit) {
    response = await RateLimitedAxios(config)
  } else {
    response = await axios(config)
  }

  return (response as unknown) as Promise<T>
}

export default axios
