import { render } from '@testing-library/react'
import { Ordered, Unordered } from '../List.stories'
import NAMES from './__fixtures__/names'
import USERNAMES from './__fixtures__/usernames'

/**
 * @file Unit Tests - List
 * @module lib/atoms/List/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:List', () => {
  describe('html', () => {
    it('renders <ul> element', () => {
      const { container } = render(<Unordered {...Unordered.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('ul')
    })
  })

  describe('props', () => {
    describe('$items', () => {
      it('renders <ol> element with nested <li> elements', () => {
        const { getByText } = render(<Ordered {...Ordered.args} />)

        // Expect child elements to rendered
        NAMES.forEach(({ children: name }) => {
          const element = getByText(name as string)

          expect(element).toBeInTheDocument()
          expect(element?.nodeName.toLowerCase()).toBe('li')
        })
      })

      it('renders <ul> element with nested <li> elements', () => {
        const { getByText } = render(<Unordered {...Unordered.args} />)

        // Expect child elements to rendered
        USERNAMES.forEach(({ children: username }) => {
          const element = getByText(username as string)

          expect(element).toBeInTheDocument()
          expect(element?.nodeName.toLowerCase()).toBe('li')
        })
      })
    })

    describe('is', () => {
      it('renders <ol> element', () => {
        const { container } = render(<Ordered {...Ordered.args} />)

        expect(container.firstChild?.nodeName.toLowerCase()).toBe('ol')
      })
    })
  })
})
