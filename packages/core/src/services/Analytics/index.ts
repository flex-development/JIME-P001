import type { AxiosInstance, AxiosStatic } from 'axios'
import GA from 'ga-measurement-protocol'
import type { TrackingCategoriesMap } from '../../types/analytics'

/**
 * @file Services - Analytics
 * @module services/Analytics
 */

class Analytics extends GA {
  /**
   * @property {string} DEFAULT_PROTOCOL_VERSION - Default version of MP to use
   */
  static DEFAULT_PROTOCOL_VERSION: string = '1'

  /**
   * @instance
   * @property {TrackingCategoriesMap} categories - Tracking categories
   */
  categories: TrackingCategoriesMap = {
    responses: { error: 'Error Response', success: 'Success Response' }
  }

  /**
   * Initalizes a Google Analytics Measurement Protocol client.
   *
   * @see https://github.com/wusuopu/ts-ga-measurement-protocol
   * @see https://github.com/axios/axios
   *
   * @param {string} trackingId - Google Analytics tracking ID
   * @param {AxiosInstance | AxiosStatic} axios - Axios instance
   * @param {boolean | string} [enabled] - Toggle tracking. Defaults to `true`
   * @param {string} [protocolVersion] - Measurement Protocol version
   * @param {boolean | string} [debug] - Toggle logs. Defaults to `true`
   */
  constructor(
    trackingId: string,
    axios: AxiosInstance | AxiosStatic,
    enabled: boolean | string = true,
    protocolVersion: string = Analytics.DEFAULT_PROTOCOL_VERSION,
    debug: boolean | string = true
  ) {
    super(trackingId, axios, protocolVersion, JSON.parse(`${debug}`))
    this._disabled = !JSON.parse(`${enabled || 'false'}`)
  }

  /**
   * Returns the tracking state value.
   *
   * @return {boolean} `true` if client is enabled, `false` otherwise
   */
  isTracking(): boolean {
    return !this._disabled
  }

  /**
   * Updates the current tracking categories map.
   *
   * @param {TrackingCategoriesMap} [categories] - New tracking categories
   * @return {TrackingCategoriesMap} Updated categories map
   */
  setCategories(categories?: TrackingCategoriesMap): TrackingCategoriesMap {
    this.categories = categories || {}
    return this.categories
  }
}

export default Analytics
