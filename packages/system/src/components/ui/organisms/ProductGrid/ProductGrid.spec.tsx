import { render } from '@testing-library/react'
import { Default } from './ProductGrid.stories'

/**
 * @file Tests - ProductGrid
 * @module components/ui/organisms/ProductGrid/spec
 */

describe('ProductGrid', () => {
  it('renders with class "product-grid"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('product-grid')
  })

  it('renders the products in the grid', () => {
    const { container } = render(<Default {...Default.args} />)

    container.firstChild?.childNodes.forEach(({ firstChild }) => {
      expect(firstChild).toHaveClass('product-card')
    })
  })
})
