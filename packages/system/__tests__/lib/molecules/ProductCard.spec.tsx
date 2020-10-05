import {
  AshTray,
  Kustomz
} from '@kustomz-stories/molecules/ProductCard.stories'
import { ProductCardProps } from '@kustomz/lib'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

/**
 * @file Tests - ProductCard
 * @module tests/lib/molecules/ProductCard
 */

it('renders <div class="product-card">', () => {
  const args = AshTray.args as ProductCardProps

  render(<AshTray {...args} data-testid={args.id} />)

  expect(screen.getByTestId(args.id)).toHaveClass('product-card')
})

it('opens and closes the product option menu', () => {
  const args = AshTray.args as ProductCardProps

  const { getByText } = render(<AshTray {...args} data-testid={args.id} />)

  // Get visible product option in dropdown header
  const first_option = getByText((args.variants || [])[0].title)

  // Open dropdown menu
  fireEvent.click(first_option)

  // First option in newly visible dropdown menu
  const second_option = getByText((args.variants || [])[1].title)

  // Expect dropdown menu to be open
  expect(second_option).toBeInTheDocument()

  // Close dropdown menu
  fireEvent.click(first_option)

  // Expect second option to be hidden again
  expect(second_option).not.toBeInTheDocument()
})

it('updates the product display image when an option is selected', () => {
  const args = AshTray.args as ProductCardProps

  const { getByAltText, getByText } = render(
    <AshTray {...args} data-testid={args.id} />
  )

  const variant = (args.variants || [])[0]
  const variant2 = (args.variants || [])[2]

  // Expect default product image to be visible
  expect(getByAltText(`${args.title} - ${variant.title}`)).toBeInTheDocument()

  // Open dropdown menu and click second option
  fireEvent.click(getByText(variant.title))
  fireEvent.click(getByText(variant2.title))

  // Expect image for second option to be shown
  expect(getByAltText(`${args.title} - ${variant2.title}`)).toBeInTheDocument()
})

it('updates the product display price when an option is selected', () => {
  const args = Kustomz.args as ProductCardProps

  const { getByText } = render(<Kustomz {...args} data-testid={args.id} />)

  const variant = (args.variants || [])[0]
  const variant2 = (args.variants || [])[2]

  // Expect default product variant price to be visible
  expect(getByText(`$${variant.price}`)).toBeInTheDocument()

  // Open dropdown menu and click second option
  fireEvent.click(getByText(variant.title))
  fireEvent.click(getByText(variant2.title))

  // Expect image for second option to be shown
  expect(getByText(`$${variant2.price}`)).toBeInTheDocument()
})

it('updates the product link when an option is selected', () => {
  const args = Kustomz.args as ProductCardProps

  const { getByText } = render(<Kustomz {...args} data-testid={args.id} />)

  const variant = (args.variants || [])[0]
  const variant2 = (args.variants || [])[2]

  const product_link = `products/${args.handle}`

  // Expect default product title to be visible
  expect(getByText(args.title)).toHaveAttribute('href', product_link)

  // Open dropdown menu and click second option
  fireEvent.click(getByText(variant.title))
  fireEvent.click(getByText(variant2.title))

  // Expect product URL to be updated
  expect(getByText(args.title)).toHaveAttribute(
    'href',
    `${product_link}?style=${variant2.sku}`
  )
})
