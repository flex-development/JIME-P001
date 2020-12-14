import { MDXBox } from '@system/components/ui/atoms'
import { render } from '@testing-library/react'
import { PageTemplate } from './PageTemplate'
import { Markdown, MDX } from './PageTemplate.stories'

/**
 * @file Tests - PageTemplate
 * @module components/ui/templates/PageTemplate/spec
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

  expect(getByText(MDXBox.displayName as string)).toBeInTheDocument()
})
