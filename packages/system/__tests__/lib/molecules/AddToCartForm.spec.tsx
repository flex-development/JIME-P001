import { AddToCartFormProps } from '@kustomz/lib'
import { render } from '@testing-library/react'
import User from '@testing-library/user-event'
import React from 'react'
import {
  AshTray,
  AshTrayData
} from '../../../storybook/stories/lib/molecules/AddToCartForm.stories'

/**
 * @file Tests - AddToCartForm
 * @module tests/lib/molecules/AddToCartForm
 */

// ! Keep in sync with TextArea aria-label property in AddToCartForm component
const TEXTAREA_LABEL = 'Kustom product description'

it('renders <form class="add-to-cart-form">', () => {
  const testid = 'ash-tray'

  const { getByTestId } = render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} data-testid={testid} />
  )

  expect(getByTestId(testid)).toHaveClass('add-to-cart-form')
})

it('only displays a <textarea> element for "KUSTOMZ" product', () => {
  const { getByLabelText } = render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} />
  )

  expect(() => getByLabelText(TEXTAREA_LABEL)).toThrowError()
})

it('updates the selected variant', () => {
  const { getByPlaceholderText } = render(
    <AshTray {...(AshTray.args as AddToCartFormProps)} />
  )

  // Get last product variant
  const variant = AshTrayData.variants[AshTrayData.variants.length - 1]

  // Get <select> element
  const select = getByPlaceholderText('Select an option')

  // Expect <select> element to be rendered
  expect(select).toBeInTheDocument()

  // Mock product variant selection
  User.selectOptions(select, [variant.id])

  expect(select).toHaveAttribute('data-selected', variant.title)
})
