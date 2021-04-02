import { SEO } from '@app/components/SEO'
import type { IPageProps as PageProps, PageComponent } from '@app/types'
import type { AnyObject } from '@flex-development/json'
import { useCartContext } from '@kustomzdesign/hooks/useCartContext'
import { CartTemplate } from '@kustomzdesign/lib/templates/CartTemplate'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import type { ReactElement } from 'react'

/**
 * @file Page - Shopping Cart
 * @module pages/cart
 */

/**
 * Renders a user's shopping cart.
 *
 * @return {ReactElement<AnyObject>} Cart page
 */
const Cart: PageComponent = (): ReactElement<AnyObject> => {
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
 *
@return {Promise<GetServerSidePropsResult<PageProps>>} Page props
 */
export const getServerSideProps: GetServerSideProps<PageProps> = (): Promise<
  GetServerSidePropsResult<PageProps>
> => {
  return Promise.resolve({ props: { seo: { title: 'Cart (O)' } } })
}

export default Cart
