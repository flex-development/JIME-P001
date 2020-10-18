import {
  Default,
  InitialQuery
} from '@system/stories/lib/molecules/SearchBar.stories'
import { render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import React from 'react'

/**
 * @file Tests - SearchBar
 * @module tests/lib/molecules/SearchBar
 *
 * @todo Unit test callback functions
 */

// ! Keep in sync with SearchBar implementation
const SEARCH_BUTTON_LABEL = 'Search button'
const SEARCH_INPUT_LABEL = 'Search query'

it('renders <form class="searchbar"> with search button', () => {
  const { container } = render(<Default {...Default.args} />)

  // Expect <form> to be rendered
  expect(container.firstChild).toHaveClass('searchbar')

  // Expect <button> and <input> elements to be in the document
  expect(container.firstChild).toContainElement(
    screen.getByLabelText(SEARCH_BUTTON_LABEL)
  )

  expect(container.firstChild).toContainElement(
    screen.getByLabelText(SEARCH_INPUT_LABEL)
  )
})

it('renders props.placeholder if defined', () => {
  const placeholder = 'Shop ash trays, rolling trays, and more'

  render(<Default {...Default.args} placeholder={placeholder} />)

  expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
})

it('updates the search query', () => {
  render(<Default {...Default.args} />)

  // Get search query <input> element
  const query_input = screen.getByLabelText(SEARCH_INPUT_LABEL)

  // Click search query <input> and enter query
  User.click(query_input)
  User.type(query_input, SEARCH_INPUT_LABEL)

  // Expect updated <input> value
  expect((query_input as HTMLInputElement).value).toBe(SEARCH_INPUT_LABEL)
})

it('sets props.query as the initial search query', () => {
  render(<InitialQuery {...InitialQuery.args} />)

  // Get search query <input> element
  const input = screen.getByLabelText(SEARCH_INPUT_LABEL)

  // Expect <input> value to match initial query
  expect((input as HTMLInputElement).value).toBe(InitialQuery.args?.query)
})
