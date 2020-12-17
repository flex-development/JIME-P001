import { render } from '@testing-library/react'
import { AshTray } from './ProductImageCarousel.stories'

/**
 * @file Tests - ProductImageCarousel
 * @module components/ui/organisms/ProductImageCarousel/spec
 */

describe('ProductImageCarousel', () => {
  it('renders with class "product-image-carousel"', () => {
    const { container } = render(<AshTray {...AshTray.args} />)

    expect(container.firstChild).toHaveClass('product-image-carousel')
  })
})
