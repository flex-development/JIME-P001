import { renderWithMockCartContext as render } from '@tests/system/__mocks__/utils'
import { CartTemplate } from './CartTemplate'
import { Cart } from './CartTemplate.stories'

/**
 * @file Tests - CartTemplate
 * @module lib/templates/CartTemplate/spec
 */

describe('CartTemplate', () => {
  it('renders with class "template" and template_id', () => {
    const { template_id } = CartTemplate

    const { container } = render(<Cart {...Cart.args} />)

    expect(container.firstChild).toHaveClass('template cart-template')
    expect(container.firstChild).toHaveAttribute('data-template', template_id)
  })
})
