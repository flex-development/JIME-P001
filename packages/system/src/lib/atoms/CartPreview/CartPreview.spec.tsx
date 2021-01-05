import { renderWithMockCartContext as render } from '@system-mocks/utils'
import { CartPreview } from './CartPreview'
import { CartPreviewProps } from './CartPreview.props'
import { Default } from './CartPreview.stories'

/**
 * @file Tests - CartPreview
 * @module lib/atoms/CartPreview/spec
 */

describe('CartPreview', () => {
  it('renders with class "cart-preview" and default href property', () => {
    const { container } = render(<Default {...Default.args} />)
    const { href } = CartPreview.defaultProps || ({} as CartPreviewProps)

    expect(container.firstChild).toHaveClass('cart-preview')
    expect(container.firstChild).toHaveAttribute('href', href as string)
  })
})
