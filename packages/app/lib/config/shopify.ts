import Client from 'shopify-buy'

/**
 * @file Shopify Buy SDK Configuration
 * @module lib/config/shopify
 */

const {
  SHOPIFY_DOMAIN: domain = '',
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: storefrontAccessToken = ''
} = process.env

export default Client.buildClient({ domain, storefrontAccessToken })
