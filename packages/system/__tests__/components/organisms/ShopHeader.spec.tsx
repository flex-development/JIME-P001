import { Default } from '@system/stories/lib/organisms/ShopHeader.stories'
import { render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ShopHeader
 * @module tests/lib/organisms/ShopHeader
 */

it('renders <header class="shop-header">', () => {
  const { container } = render(<Default {...Default.args} />)

  expect(container.firstChild).toHaveClass('shop-header')
})

it("renders the number of items in the user's cart", () => {
  const { getByText, rerender } = render(<Default {...Default.args} />)

  // Number of items defaults to 0
  expect(getByText('0 Items')).toBeInTheDocument()

  const items = 2

  // Re-render component
  rerender(<Default {...Default.args} items={items} />)

  // Expected new number of items to be shown
  expect(getByText(`${items} Items`)).toBeInTheDocument()
})
