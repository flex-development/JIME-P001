import { render } from '@testing-library/react'
import { CartTemplate } from './CartTemplate'
import { Cart } from './CartTemplate.stories'

/**
 * @file Tests - CartTemplate
 * @module components/ui/templates/CartTemplate/spec
 */

it('renders without crashing', () => {
  const { template_id } = CartTemplate

  const { container } = render(<Cart {...Cart.args} />)

  expect(container.firstChild).toHaveClass('template')
  expect(container.firstChild).toHaveAttribute('data-template', template_id)
})
