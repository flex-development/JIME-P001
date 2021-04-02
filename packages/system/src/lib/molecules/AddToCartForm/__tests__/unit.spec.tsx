import { fireEvent, render, screen } from '@testing-library/react'
import { AddToCartForm } from '../AddToCartForm'
import { AshTray } from '../AddToCartForm.stories'

/**
 * @file Unit Tests - AddToCartForm
 * @module lib/molecules/AddToCartForm/tests/unit
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 * @see https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit
 */

const { SELECT_PLACEHOLDER, TEXTAREA_PLACEHOLDER } = AddToCartForm

describe('unit:AddToCartForm', () => {
  describe('html', () => {
    it('renders with class "add-to-cart-form"', () => {
      const { container } = render(<AshTray {...AshTray.args} />)

      expect(container.firstChild).toHaveClass('add-to-cart-form')
    })
  })

  describe('props', () => {
    describe('product', () => {
      it('only displays <textarea> element for "KUSTOMZ" product', () => {
        render(<AshTray {...AshTray.args} />)

        const element = screen.getByPlaceholderText(TEXTAREA_PLACEHOLDER)

        expect(element).toHaveAttribute('hidden', '')
      })
    })
  })

  describe('callbacks', () => {
    it('calls handleVariant', () => {
      const handleVariant = jest.fn()

      render(<AshTray {...AshTray.args} handleVariant={handleVariant} />)

      // ! Mock change event
      fireEvent.change(screen.getByPlaceholderText(SELECT_PLACEHOLDER))

      expect(handleVariant).toBeCalledTimes(1)
    })
  })
})
