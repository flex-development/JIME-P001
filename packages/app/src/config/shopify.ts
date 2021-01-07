import Shopify from 'shopify-api-node'

/**
 * @file Shopify API Node Configuration
 * @module config/shopify
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
