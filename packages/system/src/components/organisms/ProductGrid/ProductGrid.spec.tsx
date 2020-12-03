import { render } from '@testing-library/react'
import { Default } from './ProductGrid.stories'

/**
 * @file Tests - ProductGrid
 * @module components/organisms/ProductGrid/spec
 */

it('renders without crashing', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('product-grid')
})

it('renders the products in the grid', () => {
  const { container } = render(<Default {...Default.args} />)

  container.firstChild?.childNodes.forEach(node => {
    expect(node.firstChild).toHaveClass('product-card')
  })
})
