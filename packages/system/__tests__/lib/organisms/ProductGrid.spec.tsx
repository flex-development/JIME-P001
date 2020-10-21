import { Default } from '@system/stories/lib/organisms/ProductGrid.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductGrid
 * @module tests/lib/organisms/ProductGrid
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
