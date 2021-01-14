import { MDXContent } from '@system/lib/molecules'
import { render } from '@testing-library/react'
import { PageTemplate } from './PageTemplate'
import { Markdown, MDX } from './PageTemplate.stories'

/**
 * @file Tests - PageTemplate
 * @module lib/templates/PageTemplate/spec
 */

describe('PageTemplate', () => {
  it('renders with class "template" and template_id', () => {
    const { container } = render(<Markdown {...Markdown.args} />)
    const { template_id } = PageTemplate

    expect(container.firstChild).toHaveClass('template page-template')
    expect(container.firstChild).toHaveAttribute('data-template', template_id)
  })

  it('renders a page with a markdown body', () => {
    const { getByText } = render(<Markdown {...Markdown.args} />)

    expect(getByText('Hello, World')).toBeInTheDocument()
  })

  it('renders a page with a MDX body', () => {
    const { getByText } = render(<MDX {...MDX.args} />)

    expect(getByText(MDXContent.displayName as string)).toBeInTheDocument()
  })
})
