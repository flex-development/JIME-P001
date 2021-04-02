import { render } from '@testing-library/react'
import { Footer } from '../Footer'

/**
 * @file Unit Tests - Footer
 * @module lib/atoms/Footer/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Footer', () => {
  describe('html', () => {
    it('renders <footer> element', () => {
      const { container } = render(<Footer />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('footer')
    })
  })
})
