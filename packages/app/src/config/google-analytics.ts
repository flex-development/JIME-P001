import axios from '@kustomzcore/axios'
import GA from 'ga-measurement-protocol'
import { nanoid } from 'nanoid'

/**
 * @file Google Analytics Configuration
 * @module config/google-analytics
 * @see https://github.com/wusuopu/ts-ga-measurement-protocol
 */

const { GA_TRACKING_ID, VERCEL, VERCEL_ENV } = process.env

// Initialize Measure Protocol client
const ga = new GA(GA_TRACKING_ID || '', axios, '1', true)

// Identifies a particular user, device, or browser instance
ga.setClientId(nanoid())

// Disable tracking in non-Vercel environments
if (!(JSON.parse(VERCEL || '0') && VERCEL_ENV !== 'development')) ga.disable()

export default ga
