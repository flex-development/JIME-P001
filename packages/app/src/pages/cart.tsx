import { getGlobalMetafields } from '@app/subdomains/metafields/utils'
import { CartTemplate, useCartContext } from '@flex-development/kustomzdesign'
import { SEO } from '@subdomains/app/components'
import { IPageProps as PageProps, PC } from '@subdomains/app/interfaces'
import { GetStaticProps } from 'next'

/**
 * @file Page - Shopping Cart
 * @module pages/cart
 */

/**
 * Renders a user's shopping cart.
 */
const Cart: PC = () => {
  const { items_total } = useCartContext()

  return (
    <>
      <SEO title={`Cart (${items_total})`} />
      <CartTemplate />
    </>
  )
}

/**
 * Fetches the data required to pre-render the cart page.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 *
 * @async
 */
export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return { props: { globals: await getGlobalMetafields() }, revalidate: 1 }
}

export default Cart
