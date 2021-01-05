import { fireEvent, render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { CheckoutLineItem } from './CheckoutLineItem'
import { AshTray, Kustomz } from './CheckoutLineItem.stories'

/**
 * @file Tests - CheckoutLineItem
 * @module lib/molecules/CheckoutLineItem/spec
 */

describe('CheckoutLineItem', () => {
  it('renders with class "checkout-line-item"', () => {
    const { container } = render(<AshTray {...AshTray.args} />)

    expect(container.firstChild).toHaveClass('checkout-line-item')
  })

  // FIXME: Component passes manual tests (check state), but fails otherwise
  it('[FALSE ALARM] updates the product quantity', () => {
    render(<Kustomz {...Kustomz.args} />)

    // Get quantity <input> element
    const input = screen.getByLabelText(CheckoutLineItem.QUANTITY_LABEL)

    // Mock product quantity update
    User.click(input)
    fireEvent.keyPress(input, { key: 'ArrowUp' })

    // Expect element with new quanity as value to be in the document
    const initial_quantity = Kustomz.args.data.quantity || 1
    expect((input as HTMLInputElement).value).toBe(`${initial_quantity + 1}`)
  })
})
