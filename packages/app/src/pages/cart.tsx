import {
  CartTemplate,
  CartTemplateProps
} from '@flex-development/kustomzdesign'
import { IPageProps, PC, SEO } from '@subdomains/app'
import { getCMSPageSEO } from '@subdomains/cms'
import { useCart } from '@subdomains/sales'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'

/**
 * @file Page - Shopping Cart
 * @module pages/cart
 */

/**
 * Renders a user's shopping cart.
 *
 * @param props - Page component props
 * @param props.page - Server side template data
 * @param props.session - CMS user session or null
 */
const Cart: PC = () => {
  // Get checkout line items, subtotal, and checkout url
  const { items, removeItem, subtotal, upsertItem, url } = useCart()

  // Get SEO metadata
  const seo = getCMSPageSEO({ title: `Cart (${items.length})` })

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
    <>
      <SEO {...seo} />
      <CartTemplate
        checkout_url={url}
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
        items={items}
        subtotal={subtotal}
      />
    </>
  )
}

/**
 * Retrieves the current CMS user session.
 *
 * @param context - Next.js page component context
 * @param context.req - HTTP request object
 * @returns Object with current CMS user session
 */
export const getServerSideProps: GetServerSideProps<IPageProps> = async (
  context: GetServerSidePropsContext
) => {
  // Get current user session
  const session = (await getSession(context)) as IPageProps['session']

  return { props: { page: {}, session } }
}

export default Cart
