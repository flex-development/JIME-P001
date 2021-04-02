import * as mod from '..'

/**
 * @file Unit Tests - Google Analytics
 * @module config/google-analytics/tests/unit
 */

describe('unit:config/google-analytics', () => {
  it('exports initialized Analytics service by default', () => {
    // Check constructor name
    expect(mod.default.constructor.name).toBe('Analytics')

    // Check tracking ID
    // @ts-expect-error testing
    expect(mod.default._trackingId).toBe(process.env.GA_TRACKING_ID)

    // Check that default client ID was set
    expect(typeof mod.default.getClientId() === 'string').toBeTruthy()
  })

  it('exports function `initializeAnalytics`', () => {
    expect(typeof mod.initializeAnalytics === 'function').toBeTruthy()
  })
})
