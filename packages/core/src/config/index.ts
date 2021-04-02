/**
 * @file Entry Point - API Configuration
 * @module config
 */

export { default as axios, interceptors, request } from './axios'
export type { RateLimitOptions } from './axios'
export { default as axiosKapi } from './axios-kapi'
export * from './constants'
export { default as ga } from './google-analytics'
export { default as createLogger } from './logger'
export { default as vercel } from './vercel-env'

/* eslint-disable prettier/prettier */
