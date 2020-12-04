import { render } from '@testing-library/react'
import { AshTray } from './ProductImageCarousel.stories'

/**
 * @file Tests - ProductImageCarousel
 * @module components/organisms/ProductImageCarousel/impl
 */

it('renders <div class="product-image-carousel">', () => {
  const { container } = render(<AshTray {...AshTray.args} />)

  expect(container.firstChild).toHaveClass('product-image-carousel')
})
