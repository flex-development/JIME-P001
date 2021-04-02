import { render } from '@testing-library/react'
import { Section } from '../Section'

/**
 * @file Unit Tests - Section
 * @module lib/atoms/Section/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Section', () => {
  describe('html', () => {
    it('renders <section> element', () => {
      const { container } = render(<Section />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('section')
    })
  })

  describe('props', () => {
    describe('$content', () => {
      it('renders with class "content-section"', () => {
        const { container } = render(<Section $content />)

        expect(container.firstChild).toHaveClass('content-section')
      })
    })
  })
})
