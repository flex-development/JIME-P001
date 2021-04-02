import isEmpty from 'lodash/isEmpty'
import { nanoid } from 'nanoid'
import Analytics from '../../services/Analytics'
import axios from '../axios'

/**
 * @file Google Analytics Configuration
 * @module config/google-analytics
 * @see https://github.com/wusuopu/ts-ga-measurement-protocol
 */

/**
 * Initalizes a Google Analytics Measurement Protocol client.
 *
 * @param {boolean | string} [enabled] - Disable / enable tracking. Defaults
 * to `process.env.GA_ENABLED`, an optional boolean or string value
 * @param {string} [trackingId] - Google Analytics tracking ID. Defaults to
 * the value of `process.env.GA_TRACKING_ID`
 * @param {string} [clientId] - ID for user, device, or browser instance
 * @return {void}
 */
export const initializeAnalytics = (
  enabled: boolean | string = process.env.GA_ENABLED || 'false',
  trackingId: string = process.env.GA_TRACKING_ID || '',
  clientId?: string
): Analytics => {
  // Initialize client
  const client = new Analytics(trackingId, axios, enabled)

  // Identifies a particular user, device, or browser instance
  client.setClientId(isEmpty(clientId) ? nanoid() : (clientId as string))

  return client
}

export default initializeAnalytics()
