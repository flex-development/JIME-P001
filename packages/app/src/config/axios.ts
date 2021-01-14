import { FeathersErrorJSON } from '@feathersjs/errors'
import { AnyObject, ANYTHING } from '@flex-development/json/utils/types'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import rateLimit from 'axios-rate-limit'
import isPlainObject from 'lodash/isPlainObject'
import pick from 'lodash/pick'

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

  if (isPlainObject(feathersError.data)) {
    if (process.env.NODE_ENV === 'development') {
      feathersError.data.config = config
    } else {
      feathersError.data.config = pick(config, [
        'url',
        'method',
        'params',
        'headers'
      ])
    }
  }

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

/**
 * Make requests to the Shopify REST API. If passed, {@param config.baseURL}
 * will be overriden.
 *
 * The extension `.json` will be appended to {@param config.url}.
 *
 * @see https://shopify.dev/docs/admin-api/rest/reference
 *
 * @param config - Axios request config
 * @param menus - If menus is true, use alternate `baseURL`
 * @throws {FeathersError}
 */
export async function axiosShopify<T = ANYTHING>(
  config: Omit<AxiosRequestConfig, 'baseURL'> = {},
  menus = false
): Promise<T> {
  // ! While in development, the menus endpoint cannot be accessed
  if (menus) {
    /* eslint-disable sort-keys */
    return ({
      menus: [
        {
          handle: 'main-menu',
          levels: 1,
          title: 'Main Menu',
          links: [
            {
              title: 'Home',
              url: '/',
              links: []
            },
            {
              title: 'Products',
              url: '/products',
              links: []
            },
            {
              title: 'About',
              url: '/about',
              links: []
            },
            {
              title: 'Instagram',
              url: '/instagram',
              links: []
            }
          ]
        },
        {
          handle: 'footer',
          levels: 0,
          title: 'Footer Menu',
          links: []
        }
      ]
    } as unknown) as T
    /* eslint-enable sort-keys */
  }

  const hostname = process.env.SHOPIFY_DOMAIN
  const password = process.env.SHOPIFY_PASSWORD
  const username = process.env.SHOPIFY_API_KEY
  const version = process.env.SHOPIFY_API_VERSION

  const login = `${username}:${password}@${hostname}`

  const baseURL = `https://${login}/admin/api/${version}/`
  const baseURLMenus = `https://${login}/`

  config = {
    ...config,
    baseURL: menus ? baseURLMenus : baseURL,
    url: menus ? 'pages/api-menus' : `${config.url}.json`
  } as typeof config

  return await axios<T>(config, true)
}

export default Axios
