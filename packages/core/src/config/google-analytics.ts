import GA from 'ga-measurement-protocol'
import { nanoid } from 'nanoid'
import axios from './axios'

/**
 * @file Google Analytics Configuration
 * @module config/google-analytics
 * @see https://github.com/wusuopu/ts-ga-measurement-protocol
 */

// Get environment variables
const GA_TRACKING_ID = process.env.GA_TRACKING_ID || ''
const VERCEL = JSON.parse(process.env.VERCEL || '0')
const VERCEL_ENV = process.env.VERCEL_ENV

// Initialize Measure Protocol client
const ga = new GA(GA_TRACKING_ID, axios, '1', true)

// Identifies a particular user, device, or browser instance
ga.setClientId(nanoid())

// Disable tracking
if (!(VERCEL && VERCEL_ENV !== 'development')) ga.disable()

export const GA_CATEGORIES = {
  responses: { error: 'Error Response', success: 'Success Response' }
}

export default ga
