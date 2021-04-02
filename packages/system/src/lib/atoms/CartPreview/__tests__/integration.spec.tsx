import type { CheckoutLineItemInput } from '@kustomzcore/types'
import CHECKOUT_LINE_ITEMS from '@system/tests/fixtures/checkout-line-items'
import { renderWithCartContextProvider } from '@system/tests/utils'
import getItemsTotal from '@system/utils/getItemsTotal'
import { screen } from '@testing-library/react'
import { Default } from '../CartPreview.stories'

/**
 * @file Integration Tests - CartPreview
 * @module lib/atoms/CartPreview/tests/integration
 * @see https://itnext.io/component-vs-ui-integration-vs-e2e-tests-f02b575339dc
 */

describe('integration:CartPreview', () => {
  const renderCartPreview = (items: CheckoutLineItemInput[]) => {
    const ui = <Default {...Default.args} />

    return {
      ...renderWithCartContextProvider(ui, { items: [...items] }),
      name: new RegExp(`${getItemsTotal(items)} items`, 'i')
    }
  }

  describe('useCartContext', () => {
    describe('displays total number of items in cart', () => {
      it('with multiple items', () => {
        const { name } = renderCartPreview(CHECKOUT_LINE_ITEMS.slice(0, 2))

        expect(screen.getByRole('link', { name })).toBeInTheDocument()
      })

      it('with one item', () => {
        const { name } = renderCartPreview(CHECKOUT_LINE_ITEMS.slice(0, 1))

        expect(screen.getByRole('link', { name })).toBeInTheDocument()
      })
    })
  })
})
