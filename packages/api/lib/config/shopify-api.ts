import Shopify from 'shopify-api-node'

/**
 * @file Shopify API Client Configuration
 * @module lib/config/shopify-api
 * @see https://github.com/MONEI/Shopify-api-node
 */

const {
  SHOPIFY_API_KEY: apiKey = '',
  SHOPIFY_API_VERSION: apiVersion = '',
  SHOPIFY_DOMAIN: shopName = '',
  SHOPIFY_PASSWORD: password = ''
} = process.env

export default new Shopify({
  apiKey,
  apiVersion,
  autoLimit: true,
  password,
  shopName
})
