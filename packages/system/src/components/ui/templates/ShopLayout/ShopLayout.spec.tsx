import { render } from '@testing-library/react'
import { ShopLayout } from './ShopLayout'
import { Home } from './ShopLayout.stories'

/**
 * @file Tests - ShopLayout
 * @module components/ui/templates/ShopLayout/spec
 */

describe('ShopLayout', () => {
  it('renders with class "template" and data-template=${template_id}', () => {
    const { template_id } = ShopLayout

    const { container } = render(<Home {...Home.args} />)

    expect(container.firstChild).toHaveClass('template')
    expect(container.firstChild).toHaveAttribute('data-template', template_id)
  })
})
