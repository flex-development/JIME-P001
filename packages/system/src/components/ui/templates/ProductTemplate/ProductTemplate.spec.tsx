import { renderWithMockCartContext as render } from '@system-mocks/utils'
import { ProductTemplate } from './ProductTemplate'
import { AshTray } from './ProductTemplate.stories'

/**
 * @file Tests - ProductTemplate
 * @module components/ui/templates/ProductTemplate/spec
 */

describe('ProductTemplate', () => {
  it('renders with class "template" and data-template=${template_id}', () => {
    const { template_id } = ProductTemplate

    const { container } = render(<AshTray {...AshTray.args} />)

    expect(container.firstChild).toHaveClass('template')
    expect(container.firstChild).toHaveAttribute('data-template', template_id)
  })
})
