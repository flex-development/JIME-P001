import { render } from '@testing-library/react'
import { Aside } from '../Aside'

/**
 * @file Unit Tests - Aside
 * @module lib/atoms/Aside/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Aside', () => {
  describe('html', () => {
    it('renders <aside> element', () => {
      const { container } = render(<Aside />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('aside')
    })
  })
})
