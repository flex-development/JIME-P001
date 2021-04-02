import { render, screen } from '@testing-library/react'
import { SearchBar } from '../SearchBar'
import { Default, InitialQuery } from '../SearchBar.stories'

/**
 * @file Unit Tests - SearchBar
 * @module lib/molecules/SearchBar/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:SearchBar', () => {
  describe('html', () => {
    it('renders <form> element with class "search-bar"', () => {
      const { container } = render(<Default {...Default.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('form')
      expect(container.firstChild).toHaveClass('search-bar')
    })

    it('renders with  <input type="search"> element', () => {
      const { container } = render(<Default {...Default.args} />)

      const input = screen.getByLabelText(SearchBar.INPUT_LABEL)

      // Expect <input type="search"> element to be rendered
      expect(container?.firstChild).toContainElement(input)
      expect(input).toHaveAttribute('type', 'search')
    })
  })

  describe('props', () => {
    describe('placeholder', () => {
      it('renders', () => {
        const placeholder = 'Shop ash trays, rolling trays, and more'

        render(<Default {...Default.args} placeholder={placeholder} />)

        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
      })
    })

    describe('query', () => {
      it('sets initial search query', () => {
        render(<InitialQuery {...InitialQuery.args} />)

        // Get search query <input> element
        const input = screen.getByLabelText(SearchBar.INPUT_LABEL)

        // Expect <input> value to match initial query
        expect(input).toHaveValue(InitialQuery.args?.query)
      })
    })
  })
})
