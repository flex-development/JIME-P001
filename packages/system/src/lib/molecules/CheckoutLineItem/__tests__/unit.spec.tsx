import { fireEvent, render } from '@testing-library/react'
import { CheckoutLineItem } from '../CheckoutLineItem'
import { AshTray } from '../CheckoutLineItem.stories'

/**
 * @file Unit Tests - CheckoutLineItem
 * @module lib/molecules/CheckoutLineItem/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('unit:CheckoutLineItem', () => {
  describe('html', () => {
    it('renders with class "checkout-line-item"', () => {
      const { container } = render(<AshTray {...AshTray.args} />)

      expect(container.firstChild).toHaveClass('checkout-line-item')
    })
  })

  describe('callbacks', () => {
    it('calls handleRemove', () => {
      const props = { ...AshTray.args, handleRemove: jest.fn() }

      const { getByRole } = render(<AshTray {...props} />)

      // ! Mock click event
      fireEvent.click(getByRole('button', { name: /remove/i }))

      expect(props.handleRemove).toBeCalled()
    })

    it('calls handleUpdate', () => {
      const props = { ...AshTray.args, handleUpdate: jest.fn() }

      const { getByLabelText } = render(<AshTray {...props} />)

      // Get <input> element
      const input = getByLabelText(CheckoutLineItem.QUANTITY_LABEL)

      // ! Mock change event
      fireEvent.change(input, { target: { value: 13 } })

      expect(props.handleUpdate).toBeCalled()
    })
  })
})
