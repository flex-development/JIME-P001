import { CartPreview } from '@system/lib/atoms/CartPreview'
import CHECKOUT_LINE_ITEMS from '@system/tests/fixtures/checkout-line-items'
import getItemsTotal from '@system/utils/getItemsTotal'
import { render, screen } from '@testing-library/react'
import { CartContextProvider as Provider } from '../CartContextProvider'

/**
 * @file Unit Tests - CartContextProvider
 * @module providers/CartContextProvider/tests/unit
 */

describe('unit:CartContextProvider', () => {
  describe('props', () => {
    describe('children', () => {
      it('renders context consumers', () => {
        const props = { children: <CartPreview />, items: CHECKOUT_LINE_ITEMS }
        const name = new RegExp(`${getItemsTotal(props.items)} items`, 'i')

        render(<Provider {...props} />)

        expect(screen.getByRole('link', { name })).toBeInTheDocument()
      })
    })
  })

  describe('callbacks', () => {
    it('calls persist', () => {
      const persist = jest.fn()

      render(<Provider persist={persist} />)

      expect(persist).toBeCalled()
    })
  })
})
