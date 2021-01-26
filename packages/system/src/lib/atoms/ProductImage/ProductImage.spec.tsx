import { render } from '@testing-library/react'
import { AshTray } from './ProductImage.stories'

/**
 * @file Tests - ProductImage
 * @module lib/atoms/ProductImage/spec
 */

describe('ProductImage', () => {
  it('renders <img> element with class "product-img"', () => {
    const { container } = render(<AshTray {...AshTray.args} />)
    expect(container.firstChild?.nextSibling).toHaveClass('product-img')
  })
})
