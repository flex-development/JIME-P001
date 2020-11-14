import createError from '@app/subdomains/app/utils/createError'
import { AnyObject, ANYTHING } from '@flex-development/kustomzdesign/types'
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { pick } from 'lodash'

/**
 * @file Axios Configuration
 * @module config/axios
 * @see {@link https://github.com/axios/axios}
 */

/**
 * Transforms an Axios error into a Feathers Error.
 *
 * @param error - Error to transform
 * @throws {FeathersErrorJSON}
 */
export const handleErrorResponse = (error: AxiosError): void => {
  const { config, message, request, response, stack } = error

  let feathersError = {} as ReturnType<typeof createError>

  if (response) {
    // The request was made and the server responded with a status code
    const { data, status } = response as AxiosResponse<AnyObject>

    feathersError = createError(message, data, status)
  } else if (request) {
    // The request was made but no response was received
    feathersError = createError('No response received.')
  } else {
    // Something happened in setting up the request that triggered an error
    feathersError = createError(message, { errors: stack })
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
export const handleSuccessResponse = (res: AxiosResponse): ANYTHING => {
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
export async function axios<T = ANYTHING>(
  config: AxiosRequestConfig
): Promise<T> {
  return ((await Axios(config)) as unknown) as Promise<T>
}
