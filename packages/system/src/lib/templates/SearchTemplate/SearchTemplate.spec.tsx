import { render } from '@testing-library/react'
import { SearchTemplate } from './SearchTemplate'
import { Search } from './SearchTemplate.stories'

/**
 * @file Tests - SearchTemplate
 * @module lib/templates/SearchTemplate/spec
 */

describe('SearchTemplate', () => {
  it('renders with class "template" and data-template=${template_id}', () => {
    const { template_id } = SearchTemplate

    const { container } = render(<Search {...Search.args} />)

    expect(container.firstChild).toHaveClass('template search-template')
    expect(container.firstChild).toHaveAttribute('data-template', template_id)
  })

  it('renders the template title with the number of search results', () => {
    const { getByText } = render(<Search {...Search.args} />)

    const title = getByText(`(${Search.args.results?.length})`)

    expect(title).toBeInTheDocument()
  })
})
