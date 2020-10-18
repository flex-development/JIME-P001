import {
  AnyObject,
  ProductVariantResource
} from '@flex-development/kustomtypez'
import {
  AshTray,
  Kustomz
} from '@system/stories/lib/molecules/AddToCartForm.stories'
import { fireEvent, render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import React from 'react'

/**
 * @file Tests - AddToCartForm
 * @module tests/lib/molecules/AddToCartForm
 */

// ! Keep in sync with AddToCartForm implementation
const QUANTITY_LABEL = 'Product quantity'
const SELECT_PLACEHOLDER = 'Select an option'
const TEXTAREA_PLACEHOLDER = 'Describe your kustom ash or rolling tray'

it('renders <form class="add-to-cart-form">', () => {
  const { container } = render(<AshTray {...AshTray.args} />)

  expect(container.firstChild).toHaveClass('add-to-cart-form')
})

it('only displays a <textarea> element for "KUSTOMZ" product', () => {
  render(<AshTray {...AshTray.args} />)

  expect(() => {
    screen.getByPlaceholderText(TEXTAREA_PLACEHOLDER)
  }).toThrowError()
})

it('updates the selected variant', () => {
  render(<AshTray {...AshTray.args} />)

  // Get <select> element
  const select = screen.getByPlaceholderText(SELECT_PLACEHOLDER)

  // Expect <select> element to be rendered
  expect(select).toBeInTheDocument()

  // Get last product variant
  const variant = AshTray.args.variants[AshTray.args.variants.length - 1]

  // Mock product variant selection
  User.selectOptions(select, [variant.id])

  // Expect data-selected to match title of selected variant
  expect(select).toHaveAttribute('data-selected', variant.title)
})

it('disables the add to cart button when an unavailable product variant is selected', () => {
  render(<AshTray {...AshTray.args} />)

  // Get unavailable product variant
  const variant = AshTray.args.variants.find(v => v.available === false) || {}

  // Mock user selection
  User.selectOptions(screen.getByPlaceholderText(SELECT_PLACEHOLDER), [
    (variant as ProductVariantResource).id
  ])

  // Expect add to cart button to be disabled
  expect(screen.getByRole('button')).toBeDisabled()
})

// FIXME: Component passes tests manually (check state), but fails otherwise
it('[FALSE ALARM] updates the product quantity', () => {
  render(<AshTray {...AshTray.args} />)

  const input = screen.getByLabelText(QUANTITY_LABEL)

  // Mock product quantity update
  User.click(input)
  fireEvent.keyPress(input, { key: 'ArrowUp' })

  // Expect element with new quanity as value to be in the document
  expect((input as HTMLInputElement).value).toBe('2')
})

it('updates the display price if the selected option has a different price than the previous option', () => {
  const { getByText } = render(<Kustomz {...Kustomz.args} />)

  // Get default product variant
  const variant = Kustomz.args.variants[0]

  // Expect price of default variant is shown
  expect(getByText(`$${variant.price}`)).toBeInTheDocument()

  // Get product variant with different price than default option
  const variant2: AnyObject =
    Kustomz.args.variants.find(v => {
      return v.price !== variant.price
    }) || {}

  // Mock user selection
  User.selectOptions(screen.getByPlaceholderText(SELECT_PLACEHOLDER), [
    (variant2 as ProductVariantResource).id
  ])

  // Expect new price to be displayed
  expect(getByText(`$${variant2.price}`)).toBeInTheDocument()
})

it('updates the kustom product description', () => {
  render(<Kustomz {...Kustomz.args} />)

  // Mock kustom product description
  const KUSTOM_PRODUCT_DESCRIPTION = 'Kustom product description'

  // Get textarea element
  const textarea = screen.getByPlaceholderText(
    TEXTAREA_PLACEHOLDER
  ) as HTMLTextAreaElement

  // Mock user entering description
  User.type(textarea, KUSTOM_PRODUCT_DESCRIPTION)

  // Expect product description to be updated
  expect(textarea.value).toBe(KUSTOM_PRODUCT_DESCRIPTION)
})
