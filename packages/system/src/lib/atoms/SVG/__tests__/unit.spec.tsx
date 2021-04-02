import { render } from '@testing-library/react'
import { LoadingDonut } from '../SVG.stories'

/**
 * @file Unit Tests - SVG
 * @module lib/atoms/SVG/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:SVG', () => {
  describe('html', () => {
    it('renders <svg> element', () => {
      const { container } = render(<LoadingDonut {...LoadingDonut.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('svg')
    })
  })
})
