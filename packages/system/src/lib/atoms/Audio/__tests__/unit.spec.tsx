import { render } from '@testing-library/react'
import { Audio } from '../Audio'

/**
 * @file Unit Tests - Audio
 * @module lib/atoms/Audio/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Audio', () => {
  describe('html', () => {
    it('renders <audio> element', () => {
      const { container } = render(<Audio />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('audio')
    })
  })
})
