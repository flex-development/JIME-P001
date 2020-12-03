import { PC } from '@app/subdomains/app'
import { useCart } from '@app/subdomains/sales'
import {
  CartTemplate,
  CartTemplateProps
} from '@flex-development/kustomzdesign'

/**
 * @file Page - Shopping Cart
 * @module pages/cart
 */

/**
 * Renders a user's shopping cart.
 */
const Cart: PC = () => {
  // Get checkout line items, subtotal, and checkout url
  const { items, removeItem, subtotal, upsertItem, url } = useCart()

  /**
   * Removes a line item from the cart.
   *
   * @param event - click event from <button> element
   */
  const handleRemove: CartTemplateProps['handleRemove'] = event => {
    event.preventDefault()
    return removeItem(JSON.parse(event.target.value))
  }

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

  return (
    <CartTemplate
      checkout_url={url}
      handleRemove={handleRemove}
      handleUpdate={handleUpdate}
      items={items}
      subtotal={subtotal}
    />
  )
}

export default Cart
