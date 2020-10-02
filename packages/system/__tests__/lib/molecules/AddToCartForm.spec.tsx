import { AnyObject } from '@flex-development/kustomtypez'
import { AddToCartFormProps } from '@kustomz/lib'
import { render } from '@testing-library/react'
import User from '@testing-library/user-event'
import React from 'react'
import {
  AshTray,
  AshTrayData,
  Kustomz,
  KustomzData
} from '../../../storybook/stories/lib/molecules/AddToCartForm.stories'

/**
 * @file Tests - AddToCartForm
 * @module tests/lib/molecules/AddToCartForm
 */

// ! Keep in sync with Select placeholder property in AddToCartForm component
const SELECT_PLACEHOLDER = 'Select an option'

// ! Keep in sync with TextArea placeholder property in AddToCartForm component
const TEXTAREA_PLACEHOLDER = 'Describe your kustom ash or rolling tray'

it('renders <form class="add-to-cart-form">', () => {
  const testid = 'ash-tray'

  const { getByTestId } = render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} data-testid={testid} />
  )

  expect(getByTestId(testid)).toHaveClass('add-to-cart-form')
})

it('only displays a <textarea> element for "KUSTOMZ" product', () => {
  const { getByPlaceholderText } = render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} />
  )

  expect(() => getByPlaceholderText(TEXTAREA_PLACEHOLDER)).toThrowError()
})

it('updates the selected variant', () => {
  const { getByPlaceholderText } = render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} />
  )

  // Get <select> element
  const select = getByPlaceholderText(SELECT_PLACEHOLDER)

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
  const { getByPlaceholderText, getByRole } = render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} />
  )

  // Get unavailable product variant
  const variant: AnyObject = AshTrayData.variants.find(v => {
    return v.available === false
  }) || {}

  // Mock user selection
  User.selectOptions(getByPlaceholderText(SELECT_PLACEHOLDER), [variant.id])

  // Expect add to cart button to be disabled
  expect(getByRole('button')).toBeDisabled()
})

// FIXME: Component passes tests manually, but interaction test
it('updates the product quantity', () => {
  const { getByDisplayValue, getByText } = render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} />
  )

  // Mock updated product quantity
  const NEW_QUANITY = '2'

  // Get input element
  const input = getByDisplayValue('1') as HTMLInputElement

  // Mock product quantity update
  User.type(input, '{selectall}{backspace}' + NEW_QUANITY)
  User.click(getByText(AshTrayData.title))

  // Expect element with new quanity as value to be in the document
  expect(input.value).toBe(NEW_QUANITY)
})

it('updates the display price if the selected option has a different price than the previous option', () => {
  const { getByPlaceholderText, getByText } = render(
    <Kustomz {...(Kustomz.args as AddToCartFormProps)} />
  )

  // Get default product variant
  const variant = KustomzData.variants[0]

  // Expect price of default variant is shown
  expect(getByText(variant.formattedPrice)).toBeInTheDocument()

  // Get product variant with different price than default option
  const variant2: AnyObject = KustomzData.variants.find(v => {
    return v.formattedPrice !== variant.formattedPrice
  }) || {}

  // Mock user selection
  User.selectOptions(getByPlaceholderText(SELECT_PLACEHOLDER), [variant2.id])

  // Expect new price to be displayed
  expect(getByText(variant2.formattedPrice)).toBeInTheDocument()
})

it('updates the kustom product description', () => {
  const { getByLabelText } = render(
    <Kustomz {...(Kustomz.args as AddToCartFormProps)} />
  )

  // Mock kustom product description
  const KUSTOM_PRODUCT_DESCRIPTION = 'Kustom product description'

  // Get textarea element
  const textarea = getByLabelText(TEXTAREA_LABEL) as HTMLTextAreaElement

  // Mock user entering description
  User.type(textarea, KUSTOM_PRODUCT_DESCRIPTION)

  // Expect product description to be updated
  expect(textarea.value).toBe(KUSTOM_PRODUCT_DESCRIPTION)
})
