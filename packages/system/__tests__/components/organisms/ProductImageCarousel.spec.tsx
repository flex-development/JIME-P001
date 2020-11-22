import { AshTray } from '@system/stories/lib/organisms/ProductImageCarousel.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductImageCarousel
 * @module tests/lib/organisms/ProductImageCarousel
 */

it('renders <div class="product-image-carousel">', () => {
  const { container } = render(<AshTray {...AshTray.args} />)

  expect(container.firstChild).toHaveClass('product-image-carousel')
})
