import { render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { SearchBar } from './SearchBar'
import { Default, InitialQuery } from './SearchBar.stories'

/**
 * @file Tests - SearchBar
 * @module components/ui/molecules/SearchBar/spec
 */

describe('SearchBar', () => {
  const { BUTTON_LABEL, INPUT_LABEL } = SearchBar

  it('renders with class "searchbar"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('searchbar')
  })

  it('renders with search button and input', () => {
    const { container } = render(<Default {...Default.args} />)
    const { firstChild } = container

    // Expect <button> and <input> elements to be in the document
    expect(firstChild).toContainElement(screen.getByLabelText(BUTTON_LABEL))
    expect(firstChild).toContainElement(screen.getByLabelText(INPUT_LABEL))
  })

  it('renders props.placeholder if defined', () => {
    const placeholder = 'Shop ash trays, rolling trays, and more'

    render(<Default {...Default.args} placeholder={placeholder} />)

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  it('updates the search query', () => {
    render(<Default {...Default.args} />)

    // Get search query <input> element
    const query_input = screen.getByLabelText(INPUT_LABEL)

    // Click search query <input> and enter query
    User.click(query_input)
    User.type(query_input, INPUT_LABEL)

    // Expect updated <input> value
    expect((query_input as HTMLInputElement).value).toBe(INPUT_LABEL)
  })

  it('sets props.query as the initial search query', () => {
    render(<InitialQuery {...InitialQuery.args} />)

    // Get search query <input> element
    const input = screen.getByLabelText(INPUT_LABEL)

    // Expect <input> value to match initial query
    expect((input as HTMLInputElement).value).toBe(InitialQuery.args?.query)
  })
})
