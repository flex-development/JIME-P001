import type { ANYTHING } from '@flex-development/json'
import type { AxiosRequestConfig } from 'axios'
import { request } from './axios'

/**
 * @file KAPI Axios Client Configuration
 * @module config/axios-kapi
 * @see {@link https://github.com/axios/axios}
 */

/**
 * Make requests to the Morena's Kustomz REST API.
 *
 * If defined, {@param config.baseURL} will be overriden.
 *
 * @template T - Payload type
 *
 * @param {Omit<AxiosRequestConfig, 'baseURL'>} config - Axios request config
 * @return {Promise<T>} Promise containing response payload
 */
async function axiosKapi<T = ANYTHING>(
  config: Omit<AxiosRequestConfig, 'baseURL'> = {}
): Promise<T> {
  const res = await request<T>({ ...config, baseURL: process.env.API_URL })
  return (res as unknown) as T
}

export default axiosKapi
