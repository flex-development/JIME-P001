import { render } from '@testing-library/react'
import { CartPreview, CartPreviewProps } from './CartPreview'
import { Default } from './CartPreview.stories'

/**
 * @file Tests - CartPreview
 * @module components/molecules/CartPreview/spec
 */

it('renders <a class="cart-preview" href="/cart">', () => {
  const { container } = render(<Default {...Default.args} />)
  const { href } = CartPreview.defaultProps || ({} as CartPreviewProps)

  expect(container.firstChild).toHaveClass('cart-preview')
  expect(container.firstChild).toHaveAttribute('href', href as string)
})

it("renders the number of items in the user's cart", () => {
  const { container, rerender } = render(<Default {...Default.args} />)

  // Expect initial number of items to be rendered
  let data_items = `${Default.args.items || 0}`
  expect(container.firstChild).toHaveAttribute('data-items', data_items)

  // Update number of items in user's cart
  const items = (Default.args?.items ?? 0) + 2

  // Re-render component
  rerender(<Default {...Default.args} items={items} />)

  // Expected new number of items to be shown
  data_items = `${items}`
  expect(container.firstChild).toHaveAttribute('data-items', data_items)
})
