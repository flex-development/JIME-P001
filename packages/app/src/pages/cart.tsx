import { getCMSPageSEO } from '@app/subdomains/cms'
import { CartTemplate, useCartContext } from '@flex-development/kustomzdesign'
import { PC, SEO } from '@subdomains/app'

/**
 * @file Page - Shopping Cart
 * @module pages/cart
 */

/**
 * Renders a user's shopping cart.
 */
const Cart: PC = () => {
  const { items_total } = useCartContext()

  // Get SEO metadata
  const seo = getCMSPageSEO({ title: `Cart (${items_total})` })

  return (
    <>
      <SEO {...seo} />
      <CartTemplate />
    </>
  )
}

export default Cart
