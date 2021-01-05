import { render } from '@testing-library/react'
import { AshTray } from './ProductHeading.stories'

/**
 * @file Tests - ProductHeading
 * @module lib/atoms/ProductHeading/spec
 */

describe('ProductHeading', () => {
  it('renders with class "product-heading"', () => {
    const { container } = render(<AshTray {...AshTray.args} />)

    expect(container?.firstChild).toHaveClass('product-heading')
  })

  it('renders the product title', () => {
    const { getByText } = render(<AshTray {...AshTray.args} />)

    expect(getByText(AshTray.args.title)).toHaveClass('product-heading-title')
  })

  it('renders the product price', () => {
    const { getByText } = render(<AshTray {...AshTray.args} />)

    const price = `$${AshTray.args.price}`

    expect(getByText(price)).toHaveClass('product-heading-price')
  })
})
