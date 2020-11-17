import {
  AshTray,
  Kustomz
} from '@system/stories/lib/molecules/ProductCard.stories'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductCard
 * @module tests/lib/molecules/ProductCard
 */

it('renders <div class="product-card">', () => {
  const { container } = render(<AshTray {...AshTray.args} />)

  expect(container.firstChild).toHaveClass('product-card')
})

it('opens and closes the product option menu', () => {
  const { getByText } = render(<AshTray {...AshTray.args} />)

  // Get visible product option in dropdown header
  const first_option = getByText((AshTray.args.variants || [])[0].title)

  // Open dropdown menu
  fireEvent.click(first_option)

  // First option in newly visible dropdown menu
  const second_option = getByText((AshTray.args.variants || [])[1].title)

  // Expect dropdown menu to be open
  expect(second_option).toBeInTheDocument()

  // Close dropdown menu
  fireEvent.click(first_option)

  // Expect second option to be hidden again
  expect(second_option).not.toBeInTheDocument()
})

it('updates the product display image when an option is selected', () => {
  const { getByAltText, getByText } = render(<AshTray {...AshTray.args} />)

  const { title, variants = [] } = AshTray.args

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

  const variant = (Kustomz.args.variants || [])[0]
  const variant2 = (Kustomz.args.variants || [])[2]

  // Expect default product variant price to be visible
  expect(getByText(`$${variant.price}`)).toBeInTheDocument()

  // Open dropdown menu and click second option
  fireEvent.click(getByText(variant.title))
  fireEvent.click(getByText(variant2.title))

  // Expect image for second option to be shown
  expect(getByText(`$${variant2.price}`)).toBeInTheDocument()
})

it('updates the product link when an option is selected', () => {
  const { getByText } = render(<Kustomz {...Kustomz.args} />)

  const variant = (Kustomz.args.variants || [])[0]
  const variant2 = (Kustomz.args.variants || [])[2]

  const product_link = `products/${Kustomz.args.handle}`

  // Expect default product title to be visible
  expect(getByText(Kustomz.args.title)).toHaveAttribute('href', product_link)

  // Open dropdown menu and click second option
  fireEvent.click(getByText(variant.title))
  fireEvent.click(getByText(variant2.title))

  // Expect product URL to be updated
  expect(getByText(Kustomz.args.title)).toHaveAttribute(
    'href',
    `${product_link}?sku=${variant2.sku}`
  )
})
