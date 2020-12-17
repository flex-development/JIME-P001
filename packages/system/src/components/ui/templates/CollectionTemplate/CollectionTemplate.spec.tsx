import { render } from '@testing-library/react'
import { CollectionTemplate } from './CollectionTemplate'
import { Products } from './CollectionTemplate.stories'

/**
 * @file Tests - CollectionTemplate
 * @module components/ui/templates/CollectionTemplate/spec
 */

describe('CollectionTemplate', () => {
  it('renders with class "template" and data-template=${template_id}', () => {
    const { template_id } = CollectionTemplate

    const { container } = render(<Products {...Products.args} />)

    expect(container.firstChild).toHaveClass('template')
    expect(container.firstChild).toHaveAttribute('data-template', template_id)
  })

  it('renders the collection title', () => {
    const { getByText } = render(<Products {...Products.args} />)
    const { collection } = Products.args

    expect(getByText(collection.title)).toBeInTheDocument()
  })

  it('renders the collection description', () => {
    const { getByText } = render(<Products {...Products.args} />)
    const { collection } = Products.args

    expect(getByText(collection.body_html as string)).toBeInTheDocument()
  })
})
