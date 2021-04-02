import { render } from '@testing-library/react'
import { Nav } from '../Nav'

/**
 * @file Unit Tests - Nav
 * @module lib/atoms/Nav/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Nav', () => {
  describe('html', () => {
    it('renders <nav> element', () => {
      const { container } = render(<Nav />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('nav')
    })
  })
})
