import { AnyObject } from '@flex-development/kustomtypez'
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { pick } from 'lodash'
import { getFeathersError } from '../../../lib'

/**
 * @file Axios Configuration
 * @module pages/api/config/axios
 * @see {@link https://github.com/axios/axios}
 */

/**
 * Transforms an Axios error into a Feathers Error.
 *
 * @param error - Error to transform
 * @throws {FeathersError}
 */
export const handleErrorResponse = (error: AxiosError): void => {
  const { config, message, request, response, stack } = error

  let feathersError = {} as ReturnType<typeof getFeathersError>

  if (response) {
    // The request was made and the server responded with a status code
    const { data, status } = response as AxiosResponse<AnyObject>

    if (config.url?.includes('api.linkedin')) {
      const { message, status, ...restOfData } = data

      if (status === 401) {
        restOfData.errors = [
          { headers: pick(config.headers, ['authorization']) }
        ]
      }

      feathersError = getFeathersError(message, restOfData, status)
    } else {
      feathersError = getFeathersError(message, data, status)
    }
  } else if (request) {
    // The request was made but no response was received
    feathersError = getFeathersError('No response received.')
  } else {
    // Something happened in setting up the request that triggered an error
    feathersError = getFeathersError(message, { errors: stack })
  }

  feathersError.data.config = pick(config, [
    'url',
    'method',
    'params',
    'headers'
  ])

  throw feathersError
}

/**
 * Returns the data from a successful request.
 *
 * @param response - Success response
 * @throws {FeathersError}
 */
export const handleSuccessResponse = (res: AxiosResponse): any => {
  return res?.data ?? res
}

Axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse)

/**
 * Passes the request config to our configured Axios client. Used to properly
 * type response data when using {@link handleSuccessResponse}.
 *
 * @param response - Success response
 * @throws {FeathersError}
 */
export async function axios<T = any>(config: AxiosRequestConfig): Promise<T> {
  try {
    return ((await Axios(config)) as unknown) as Promise<T>
  } catch (error) {
    throw error
  }
}
