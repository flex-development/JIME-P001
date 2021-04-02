import { initializeAnalytics } from '..'
import Analytics from '../../../services/Analytics'

/**
 * @file Integration Tests - Google Analytics
 * @module config/google-analytics/tests/integration
 */

jest.mock('../../../services/Analytics')

const AnalyticsMock = Analytics as jest.MockedClass<typeof Analytics>

describe('integration:config/google-analytics', () => {
  describe('initializeAnalytics', () => {
    it('calls Analytics service class constructor', () => {
      initializeAnalytics()

      expect(AnalyticsMock).toHaveBeenCalledTimes(1)
    })

    it('calls `setClientId` on Analytics service class instance', () => {
      initializeAnalytics()

      const spy = jest.spyOn(AnalyticsMock.mock.instances[0], 'setClientId')
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
