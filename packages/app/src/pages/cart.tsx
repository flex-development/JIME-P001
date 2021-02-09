import { CartTemplate } from '@components/templates/CartTemplate'
import { useCartContext } from '@hooks/useCart'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  IPageProps as PageProps,
  PageComponent
} from '@subdomains/app/types'
import globalSEO from '@subdomains/app/utils/globalSEO'
import merge from 'lodash/merge'
import type { GetServerSideProps } from 'next'

/**
 * @file Page - Shopping Cart
 * @module pages/cart
 */

/**
 * Renders a user's shopping cart.
 *
 * @param props - Page component props
 * @param props.seo - `SEO` component properties
 */
const Cart: PageComponent = ({ seo }) => {
  const { items_total } = useCartContext()

  return (
    <>
      <SEO {...seo} title={`Cart (${items_total})`} />
      <CartTemplate />
    </>
  )
}

/**
 * Fetches the data required to render the cart page.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @async
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  return { props: { seo: merge(await globalSEO(), { title: 'Cart (O)' }) } }
}

export default Cart
