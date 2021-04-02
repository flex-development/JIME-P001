import { render, screen } from '@testing-library/react'
import User, { specialChars } from '@testing-library/user-event'
import { SearchBar } from '../SearchBar'
import { Default } from '../SearchBar.stories'

/**
 * @file Integration Tests - SearchBar
 * @module lib/molecules/SearchBar/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('integration:SearchBar', () => {
  describe('simulate user', () => {
    it('perform search', () => {
      const handleSearch = jest.fn()

      render(<Default {...Default.args} handleSearch={handleSearch} />)

      // Get search query <input> element
      const input = screen.getByLabelText(SearchBar.INPUT_LABEL)

      // ! Simulate user entering new search term
      User.click(input)
      User.type(input, SearchBar.INPUT_LABEL)

      // Expect updated <input> value
      expect(input).toHaveValue(SearchBar.INPUT_LABEL)

      // ! Simulate form submission
      User.type(input, specialChars.enter)

      // Expect handleSearch callback to fire
      expect(handleSearch).toBeCalledTimes(1)
    })
  })
})
