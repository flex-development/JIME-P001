/**
 * @file Entry Point - API Configuration
 * @module config
 */

export { default as ALGOLIA } from './algolia-search'
export { default as Axios, RateLimitedAxios, request } from './axios'
export { default as axiosKapi } from './axios-kapi'
export { default as axiosShopify } from './axios-shopify'
export * from './constants'
export { default as ga } from './google-analytics'
export { default as createLogger } from './logger'
export * from './shopify-api'
export { default as ShopifyAPI } from './shopify-api'
export { default as vercel } from './vercel-env'

/* eslint-disable prettier/prettier */
