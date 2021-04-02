import { render } from '@testing-library/react'
import { Default } from '../Item.stories'

/**
 * @file Unit Tests - Item
 * @module lib/atoms/Item/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:Item', () => {
  describe('html', () => {
    it('renders <li> element', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('li')
    })
  })

  describe('props', () => {
    describe('children', () => {
      it('renders item text', () => {
        const { container } = render(<Default {...Default.args} />)

        const text = Default.args.children as string

        expect(container.firstChild).toHaveTextContent(text)
      })
    })
  })
})
