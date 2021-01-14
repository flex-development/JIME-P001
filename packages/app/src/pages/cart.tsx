import { useCartContext } from '@hooks/useCart'
import { CartTemplate } from '@lib/templates/CartTemplate'
import { SEO } from '@subdomains/app/components/SEO'
import { IPageProps as PageProps, PC } from '@subdomains/app/interfaces'
import globalMetafields from '@subdomains/metafields/utils/globalMetafields'
import { GetStaticProps } from 'next'

/**
 * @file Page - Shopping Cart
 * @module pages/cart
 */

/**
 * Renders a user's shopping cart.
 *
 * @param props - Page component props
 * @param props.globals - Shopify `globals` namespace metafields obj
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
 * Fetches the data required to render the cart page.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 *
 * @async
 */
export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return { props: { globals: await globalMetafields() }, revalidate: 1 }
}

export default Cart
