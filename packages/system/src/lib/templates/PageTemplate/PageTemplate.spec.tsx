import { render } from '@testing-library/react'
import { PageTemplate } from './PageTemplate'
import { Markdown } from './PageTemplate.stories'

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
})
