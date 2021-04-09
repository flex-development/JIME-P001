import type { IProductListingVariant } from '@core/types'
import { fireEvent, render, screen } from '@testing-library/react'
import User from '@testing-library/user-event'
import { CheckoutLineItem } from '../CheckoutLineItem'
import { Kustomz } from '../CheckoutLineItem.stories'

/**
 * @file Integration Tests - CheckoutLineItem
 * @module lib/molecules/CheckoutLineItem/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('integration:CheckoutLineItem', () => {
  const { product, quantity, variant_id } = Kustomz.args.data
  const { images, title, variants } = product

  const { image_id, price: vprice, title: vtitle } = variants.find(
    v => v.id === variant_id
  ) as IProductListingVariant

  const price = `${quantity * JSON.parse(vprice)}`

  const { alt } = images.find(image => image.id === image_id) || {}

  describe('html', () => {
    it('displays initial checkout line item data', () => {
      render(<Kustomz {...Kustomz.args} />)

      // Check that product title is rendered
      expect(screen.getByText(title)).toBeInTheDocument()

      // Check that product variant price is rendered
      expect(screen.getByText(new RegExp(price, 'i'))).toBeInTheDocument()

      // Check that product variant title is rendered
      expect(screen.getByDisplayValue(vtitle)).toBeInTheDocument()

      // Check that product variant image is rendered
      expect(screen.getByAltText(alt as string)).toBeInTheDocument()
    })
  })

  describe('simulate user', () => {
    it('remove item from cart', () => {
      const handleRemove = jest.fn()

      render(<Kustomz {...Kustomz.args} handleRemove={handleRemove} />)

      // Get <button> element
      const button = screen.getByRole('button', { name: /remove/i })

      // ! Simulate user remove item from cart
      User.click(button)

      // Expect that `handleRemove` was called
      expect(handleRemove).toBeCalled()
    })

    describe('update product quantity', () => {
      const handleUpdate = jest.fn()

      beforeEach(() => {
        handleUpdate.mockClear()
      })

      it.skip('with arrow buttons', () => {
        render(<Kustomz {...Kustomz.args} handleUpdate={handleUpdate} />)

        // Get quantity <input> element
        const input = screen.getByLabelText(CheckoutLineItem.QUANTITY_LABEL)

        // ! Simulate user updating quanitity with <input> arrow buttons
        User.click(input)
        fireEvent.keyDown(input, { code: 'ArrowUp', key: 'ArrowUp' })

        // Expect `handeUpdate` callback to fire and new value to be reflected
        expect(handleUpdate).toBeCalled()
        expect(input).toHaveValue(quantity + 1)
      })

      it('by typing new value', () => {
        render(<Kustomz {...Kustomz.args} handleUpdate={handleUpdate} />)

        // Get quantity <input> element and typed value
        const input = screen.getByLabelText(CheckoutLineItem.QUANTITY_LABEL)
        const typed = '0'

        // ! Simulate user updating quanitity by typing new value
        User.type(input, typed)

        // Expect `handeUpdate` callback to fire and new value to be reflected
        expect(handleUpdate).toBeCalled()
        expect(input).toHaveValue(JSON.parse(`${quantity}${typed}`))
      })
    })
  })
})
