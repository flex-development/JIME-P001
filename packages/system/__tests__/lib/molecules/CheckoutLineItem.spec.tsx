import {
  AshTray,
  Kustomz
} from '@kustomz-stories/molecules/CheckoutLineItem.stories'
import { CheckoutLineItemProps } from '@kustomz/lib'
import { fireEvent, Matcher, render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import React from 'react'

/**
 * @file Tests - CheckoutLineItem
 * @module tests/lib/molecules/CheckoutLineItem
 */

it('renders <div class="line-item">', () => {
  const args = AshTray.args as CheckoutLineItemProps

  render(<AshTray {...args} data-testid={args.id} />)

  expect(screen.getByTestId(args.id)).toHaveClass('line-item')
})

it('updates the product quantity', () => {
  const args = Kustomz.args as CheckoutLineItemProps

  render(<Kustomz {...args} data-testid={args.id} />)

  // Initial quantity
  const initial_quantity = args.quantity || 1

  // Get input element
  const input_matcher = (initial_quantity as unknown) as Matcher

  // FIXME: TypeError: matcher.test is not a function
  const input = screen.getByDisplayValue(input_matcher) as HTMLInputElement

  // Mock product quantity update
  User.click(input)
  fireEvent.keyPress(input, { key: 'ArrowUp' })

  // Expect element with new quanity as value to be in the document
  expect(input.value).toBe(`${initial_quantity + 1}`)
})
