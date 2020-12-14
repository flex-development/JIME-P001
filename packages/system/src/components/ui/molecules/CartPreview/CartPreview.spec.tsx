import { render } from '@testing-library/react'
import { CartPreview, CartPreviewProps } from './CartPreview'
import { Default } from './CartPreview.stories'

/**
 * @file Tests - CartPreview
 * @module components/ui/molecules/CartPreview/spec
 */

it('renders <a class="cart-preview" href="/cart">', () => {
  const { container } = render(<Default {...Default.args} />)
  const { href } = CartPreview.defaultProps || ({} as CartPreviewProps)

  expect(container.firstChild).toHaveClass('cart-preview')
  expect(container.firstChild).toHaveAttribute('href', href as string)
})
