import {
  CartTemplate,
  CartTemplateProps
} from '@flex-development/kustomzdesign'
import { PC, SEO } from '@subdomains/app'
import { getCMSPageSEO } from '@subdomains/cms'
import { useCart } from '@subdomains/sales'
import { useCallback } from 'react'

/**
 * @file Page - Shopping Cart
 * @module pages/cart
 */

/**
 * Renders a user's shopping cart.
 */
const Cart: PC = () => {
  const { items, items_total, removeItem, upsertItem, url } = useCart()

  // Get SEO metadata
  const seo = getCMSPageSEO({ title: `Cart (${items_total})` })

  /**
   * Removes a line item from the cart.
   *
   * @param event - click event from <button> element
   */
  const handleRemove: CartTemplateProps['handleRemove'] = event => {
    event.preventDefault()
    return removeItem(JSON.parse(event.target.value))
  }

  /* Callback version of `handleRemove` */
  const handleRemoveCB = useCallback(handleRemove, [removeItem])

  /**
   * Updates a line item in the cart.
   *
   * @param data - Updated line item
   * @param event - change event from <input> element
   */
  const handleUpdate: CartTemplateProps['handleUpdate'] = (data, event) => {
    event.preventDefault()
    return upsertItem(data)
  }

  /* Callback version of `handleUpdate` */
  const handleUpdateCB = useCallback(handleUpdate, [upsertItem])

  return (
    <>
      <SEO {...seo} />
      <CartTemplate
        checkout_url={url}
        handleRemove={handleRemoveCB}
        handleUpdate={handleUpdateCB}
        items={items}
      />
    </>
  )
}

export default Cart
