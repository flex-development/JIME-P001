import Shopify from 'shopify-api-node'

/**
 * @file Shopify API Client Configuration
 * @module config/shopify-api
 * @see https://github.com/MONEI/Shopify-api-node
 */

const {
  SHOPIFY_API_KEY: apiKey = '',
  SHOPIFY_API_VERSION: apiVersion = '',
  SHOPIFY_DOMAIN: shopName = '',
  SHOPIFY_PASSWORD: password = ''
} = process.env

export const SHOPIFY = new Shopify({
  apiKey,
  apiVersion,
  autoLimit: true,
  password,
  shopName
})

export const COLLECTION_LISTINGS = SHOPIFY.collectionListing
export const PAGES = SHOPIFY.page
export const PRODUCT_LISTINGS = SHOPIFY.productListing
export const POLICIES = SHOPIFY.policy
