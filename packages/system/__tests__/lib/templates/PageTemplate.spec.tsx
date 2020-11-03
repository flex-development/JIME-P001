import { PageTemplate } from '@system/components'
import {
  Markdown,
  MDX
} from '@system/stories/lib/templates/PageTemplate.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - PageTemplate
 * @module tests/lib/templates/PageTemplate
 */

const { template_id } = PageTemplate

it('renders a page with a markdown body', () => {
  const { container, getByText } = render(<Markdown {...Markdown.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)

  expect(getByText('Hello, World')).toBeInTheDocument()
})

it('renders a page with a MDX body', () => {
  const { getByText } = render(<MDX {...MDX.args} />)

  expect(getByText('MDX Page')).toBeInTheDocument()
})
