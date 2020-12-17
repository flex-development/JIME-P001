import { render } from '@testing-library/react'
import { Default } from './ShopHeader.stories'

/**
 * @file Tests - ShopHeader
 * @module components/ui/organisms/ShopHeader/spec
 */

describe('ShopHeader', () => {
  it('renders with class "shop-header"', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveClass('shop-header')
  })
})
