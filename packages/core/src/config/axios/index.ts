import type { ANYTHING } from '@flex-development/json'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import rateLimit from 'axios-rate-limit'
import onFulfilled from '../../utils/onFulfilled'
import onRejected from '../../utils/onRejected'

/**
 * @file Axios Configuration
 * @module config/axios
 * @see {@link https://github.com/axios/axios}
 */

/**
 * Shape of an Axios rate limit options object.
 *
 * @see https://github.com/aishek/axios-rate-limit
 */
export type RateLimitOptions = {
  maxRPS?: number
  maxRequests?: number
  perMilliseconds?: number
}

/** @see https://github.com/axios/axios#interceptors */
export const interceptors = axios.interceptors.response.use(
  onFulfilled,
  onRejected
)

/**
 * Wrapper around the `axios` module with options for rate limiting.
 *
 * @template T - Payload type
 *
 * @param {AxiosRequestConfig} config - Axios request config
 * @param {RateLimitOptions | boolean} limit - Custom rate limit options, `true`
 * to use defaults `{ maxRPS: 2, maxRequests: 2, perMilliseconds: 1000 }`, or
 * `false` to disable rate limit. Defaults to `false`
 * @return {Promise<T>} Promise containing payload or res object
 * @throws {ErrorJSON}
 */
export async function request<T = ANYTHING>(
  config: AxiosRequestConfig,
  limit: RateLimitOptions | boolean = false
): Promise<T> {
  let response: ANYTHING = null

  if (!limit) {
    response = await axios(config)
  } else {
    const doptions = { maxRPS: 2, maxRequests: 2, perMilliseconds: 1000 }
    const options = limit === true ? doptions : (limit as RateLimitOptions)

    response = await rateLimit(axios, options)(config)
  }

  return (response as unknown) as Promise<T>
}

export default axios
