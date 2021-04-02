import { render } from '@testing-library/react'
import { Box } from '../Box'

/**
 * @file Unit Tests - Box
 * @module lib/atoms/Box/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Box', () => {
  describe('html', () => {
    it('renders <div> element', () => {
      const { container } = render(<Box />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('div')
    })
  })
})
