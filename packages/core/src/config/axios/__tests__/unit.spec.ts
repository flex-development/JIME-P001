import mockAxios from 'axios'
import mockRateLimit from 'axios-rate-limit'
import * as subject from '..'
import CONFIG from './__fixtures__/config'

/**
 * @file Unit Tests - axios
 * @module config/axios/tests/unit
 */

describe('unit:config/axios', () => {
  it('exports default function', () => {
    expect(typeof subject.default === 'function').toBeTruthy()
  })

  describe('request', () => {
    it('exports', () => {
      expect(typeof subject.request === 'function').toBeTruthy()
    })

    it('applies rate limit if args[1] is truthy', async () => {
      await subject.request(CONFIG, true)

      expect(mockRateLimit).toHaveBeenCalled()
      expect(mockAxios).not.toHaveBeenCalled()
    })

    it('does not apply rate limit if args[1] is falsy', async () => {
      await subject.request(CONFIG)

      expect(mockAxios).toHaveBeenCalled()
      expect(mockRateLimit).not.toHaveBeenCalled()
    })
  })
})
