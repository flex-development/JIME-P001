import { render } from '@testing-library/react'
import { Default } from '../Span.stories'

/**
 * @file Unit Tests - Span
 * @module lib/atoms/Span/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Span', () => {
  describe('html', () => {
    it('renders <span> element', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('span')
    })
  })

  describe('props', () => {
    describe('children', () => {
      it('renders span text', () => {
        const { getByText } = render(<Default {...Default.args} />)

        expect(getByText(Default.args.children as string)).toBeInTheDocument()
      })
    })
  })
})
