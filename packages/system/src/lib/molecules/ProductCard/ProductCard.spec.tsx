import { fireEvent, render } from '@testing-library/react'
import { AshTray, Kustomz } from './ProductCard.stories'

/**
 * @file Tests - ProductCard
 * @module lib/molecules/ProductCard/spec
 */

describe('ProductCard', () => {
  it('renders with class "product-card"', () => {
    const { container } = render(<AshTray {...AshTray.args} />)

    expect(container.firstChild).toHaveClass('product-card')
  })

  it('opens and closes the product variant options menu', () => {
    const { getByText } = render(<AshTray {...AshTray.args} />)

    const variant = AshTray.args.product.variants[0]
    const variant2 = AshTray.args.product.variants[1]

    // Get visible product option in dropdown header
    const first_option = getByText(variant.title)

    // Open dropdown menu
    fireEvent.click(first_option)

    // First option in newly visible dropdown menu
    const second_option = getByText(variant2.title)

    // Expect dropdown menu to be open
    expect(second_option).toBeInTheDocument()

    // Close dropdown menu
    fireEvent.click(first_option)

    // Expect second option to be hidden again
    expect(second_option).not.toBeInTheDocument()
  })

  it('updates the product display image when an option is selected', () => {
    const { getByAltText, getByText } = render(<AshTray {...AshTray.args} />)

    const { title, variants } = AshTray.args.product

    const variant = variants[0]
    const variant2 = variants[2]

    // Expect default product image to be visible
    expect(getByAltText(`${title} - ${variant.title}`)).toBeInTheDocument()

    // Open dropdown menu and click second option
    fireEvent.click(getByText(variant.title))
    fireEvent.click(getByText(variant2.title))

    // Expect image for second option to be shown
    expect(getByAltText(`${title} - ${variant2.title}`)).toBeInTheDocument()
  })

  it('updates the product display price when an option is selected', () => {
    const { getByText } = render(<Kustomz {...Kustomz.args} />)

    const variant = Kustomz.args.product.variants[0]
    const variant2 = Kustomz.args.product.variants[2]

    // Expect default product variant price to be visible
    expect(getByText(`$${variant.price}`)).toBeInTheDocument()

    // Open dropdown menu and click second option
    fireEvent.click(getByText(variant.title))
    fireEvent.click(getByText(variant2.title))

    // Expect image for second option to be shown
    expect(getByText(`$${variant2.price}`)).toBeInTheDocument()
  })
})
