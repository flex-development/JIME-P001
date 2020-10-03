import { AnyObject } from '@flex-development/kustomtypez'
import {
  AshTray,
  AshTrayData,
  Kustomz,
  KustomzData
} from '@kustomz-stories/molecules/AddToCartForm.stories'
import { AddToCartFormProps } from '@kustomz/lib'
import { render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import React from 'react'

/**
 * @file Tests - AddToCartForm
 * @module tests/lib/molecules/AddToCartForm
 */

// ! Keep in sync with AddToCartForm implementation
const SELECT_PLACEHOLDER = 'Select an option'
const TEXTAREA_PLACEHOLDER = 'Describe your kustom ash or rolling tray'

it('renders <form class="add-to-cart-form">', () => {
  const testid = 'ash-tray'

  render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} data-testid={testid} />
  )

  expect(screen.getByTestId(testid)).toHaveClass('add-to-cart-form')
})

it('only displays a <textarea> element for "KUSTOMZ" product', () => {
  render(<AshTray {...(AshTray.args as AddToCartFormProps)} />)

  expect(() => {
    screen.getByPlaceholderText(TEXTAREA_PLACEHOLDER)
  }).toThrowError()
})

it('updates the selected variant', () => {
  render(<AshTray {...(AshTray.args as AddToCartFormProps)} />)

  // Get <select> element
  const select = screen.getByPlaceholderText(SELECT_PLACEHOLDER)

  // Expect <select> element to be rendered
  expect(select).toBeInTheDocument()

  // Get last product variant
  const variant = AshTrayData.variants[AshTrayData.variants.length - 1]

  // Mock product variant selection
  User.selectOptions(select, [variant.id])

  // Expect data-selected to match title of selected variant
  expect(select).toHaveAttribute('data-selected', variant.title)
})

it('disables the add to cart button when an unavailable product variant is selected', () => {
  render(<AshTray {...(AshTray.args as AddToCartFormProps)} />)

  // Get unavailable product variant
  const variant: AnyObject =
    AshTrayData.variants.find(v => {
      return v.available === false
    }) || {}

  // Mock user selection
  User.selectOptions(screen.getByPlaceholderText(SELECT_PLACEHOLDER), [
    variant.id
  ])

  // Expect add to cart button to be disabled
  expect(screen.getByRole('button')).toBeDisabled()
})

// FIXME: Component passes tests manually, but interaction test
it('updates the product quantity', () => {
  const { getByText } = render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} />
  )

  // Mock updated product quantity
  const NEW_QUANITY = '2'

  // Get input element
  const input = screen.getByDisplayValue('1') as HTMLInputElement

  // Mock product quantity update
  User.type(input, '{selectall}{backspace}' + NEW_QUANITY)
  User.click(getByText(AshTrayData.title))

  // Expect element with new quanity as value to be in the document
  expect(input.value).toBe(NEW_QUANITY)
})

it('updates the display price if the selected option has a different price than the previous option', () => {
  const { getByText } = render(
    <Kustomz {...(Kustomz.args as AddToCartFormProps)} />
  )

  // Get default product variant
  const variant = KustomzData.variants[0]

  // Expect price of default variant is shown
  expect(getByText(variant.formattedPrice)).toBeInTheDocument()

  // Get product variant with different price than default option
  const variant2: AnyObject =
    KustomzData.variants.find(v => {
      return v.formattedPrice !== variant.formattedPrice
    }) || {}

  // Mock user selection
  User.selectOptions(screen.getByPlaceholderText(SELECT_PLACEHOLDER), [
    variant2.id
  ])

  // Expect new price to be displayed
  expect(getByText(variant2.formattedPrice)).toBeInTheDocument()
})

it('updates the kustom product description', () => {
  render(<Kustomz {...(Kustomz.args as AddToCartFormProps)} />)

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
