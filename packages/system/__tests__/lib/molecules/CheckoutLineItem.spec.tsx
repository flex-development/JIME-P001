import {
  AshTray,
  Kustomz
} from '@kustomz-stories/molecules/CheckoutLineItem.stories'
import { fireEvent, render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import React from 'react'

/**
 * @file Tests - CheckoutLineItem
 * @module tests/lib/molecules/CheckoutLineItem
 */

// ! Keep in sync with CheckoutLineItem implementation
const QUANTITY_LABEL = 'Line item quantity'

it('renders <div class="line-item">', () => {
  const { container } = render(<AshTray {...AshTray.args} />)

  expect(container.firstChild).toHaveClass('line-item')
})

// FIXME: Component passes tests manually (check state), but fails otherwise
it('[FALSE ALARM] updates the product quantity', () => {
  render(<Kustomz {...Kustomz.args} />)

  // Get quantity <input> element
  const input = screen.getByLabelText(QUANTITY_LABEL)

  // Mock product quantity update
  User.click(input)
  fireEvent.keyPress(input, { key: 'ArrowUp' })

  // Expect element with new quanity as value to be in the document
  const initial_quantity = Kustomz.args.quantity || 1
  expect((input as HTMLInputElement).value).toBe(`${initial_quantity + 1}`)
})
