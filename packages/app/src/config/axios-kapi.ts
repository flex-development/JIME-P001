import type { ANYTHING } from '@flex-development/json/utils/types'
import { axios } from '@flex-development/kustomzcore/axios'
import type { AxiosRequestConfig } from 'axios'

/**
 * @file KAPI Axios Client Configuration
 * @module config/axios-kapi
 * @see {@link https://github.com/axios/axios}
 */

/**
 * Make requests to the Morena's Kustomz REST API. If passed,
 * {@param config.baseURL}  will be overriden.
 *
 * @param config - Axios request config
 */
async function axiosKapi<T = ANYTHING>(
  config: Omit<AxiosRequestConfig, 'baseURL'> = {}
): Promise<T> {
  const res = await axios<T>({ ...config, baseURL: process.env.API_URL })
  return (res as unknown) as T
}

export default axiosKapi
