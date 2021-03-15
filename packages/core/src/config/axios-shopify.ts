import type { ANYTHING } from '@flex-development/json'
import type { AxiosRequestConfig } from 'axios'
import { request } from './axios'

/**
 * @file Shopify Axios Configuration
 * @module config/axios-shopify
 * @see {@link https://github.com/axios/axios}
 */

/**
 * Make requests to the Shopify REST API. If passed, {@param config.baseURL}
 * will be overriden.
 *
 * The extension `.json` will be appended to {@param config.url}.
 *
 * @see https://shopify.dev/docs/admin-api/rest/reference
 *
 * @template T - Payload type
 *
 * @param {AxiosRequestConfig} config - Axios request config
 * @param {boolean} menus - If menus is true, use alternate `baseURL`
 * @return {Promise<T>} Promise containing response payload
 * @throws {FeathersErrorJSON}
 */
async function axiosShopify<T = ANYTHING>(
  config: Omit<AxiosRequestConfig, 'baseURL'> = {},
  menus: boolean = false
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
              href: '/',
              links: []
            },
            {
              title: 'Products',
              href: '/products',
              links: []
            },
            {
              title: 'About',
              href: '/about',
              links: []
            },
            {
              title: 'Instagram',
              href: '/instagram',
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

  return await request<T>(config, true)
}

export default axiosShopify
