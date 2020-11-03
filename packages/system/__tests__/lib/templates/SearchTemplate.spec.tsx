import { SearchTemplate } from '@system/components'
import { Search } from '@system/stories/lib/templates/SearchTemplate.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - SearchTemplate
 * @module tests/lib/templates/SearchTemplate
 */

it('renders without crashing', () => {
  const { template_id } = SearchTemplate

  const { container } = render(<Search {...Search.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)
})

it('renders the template title with the number of search results', () => {
  const { getByText } = render(<Search {...Search.args} />)

  const title = getByText(`(${Search.args.results?.length})`)

  expect(title).toBeInTheDocument()
})
