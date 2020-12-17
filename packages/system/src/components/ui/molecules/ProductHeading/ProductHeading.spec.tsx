import { render } from '@testing-library/react'
import { AshTray } from './ProductHeading.stories'

/**
 * @file Tests - ProductHeading
 * @module components/ui/molecules/ProductHeading/spec
 */

describe('ProductHeading', () => {
  it('renders with class "product-heading"', () => {
    const { container } = render(<AshTray {...AshTray.args} />)

    expect(container?.firstChild).toHaveClass('product-heading')
  })

  it('renders the title and price of a product', () => {
    const { getByText } = render(<AshTray {...AshTray.args} />)

    const { price, title } = AshTray.args

    expect(getByText(`$${price}`)).toBeInTheDocument()
    expect(getByText(title)).toBeInTheDocument()
  })
})
