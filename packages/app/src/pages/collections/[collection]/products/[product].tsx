import { IPageProps, PC, ServerSidePageProps } from '@app/subdomains/app'
import { CollectionService } from '@app/subdomains/sales'
import { FeathersErrorJSON } from '@feathersjs/errors'
import { ProductTemplateProps } from '@flex-development/kustomzdesign'
import { isArray } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import ProductPage, {
  getServerSideProps as getServerSideProductPageProps
} from '../../../products/[handle]'

/**
 * @file Page - Collection Product
 * @module pages/collections/collection/products/product
 */

/**
 * Renders a product page.
 * The value of {@param props.session} will always be `null`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.collection - `LinkProps` for product collection
 * @param props.collection.href - Link to collection
 * @param props.collection.title - Title of collection
 * @param props.session - Current user session or null
 */
const CollectionProduct: PC = (props: IPageProps) => {
  return <ProductPage {...props} />
}

/**
 * Retrieves the data for the `ProductTemplate`.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.params - Route parameters if dynamic route
 * @returns Product listing object and an array of products in the collection
 */
export const getServerSideProps: ServerSidePageProps = async (
  context: GetServerSidePropsContext
) => {
  const { params = {}, query = {} } = context

  // Get handle params
  let { collection: c_handle, product: p_handle } = params

  // Get one collection handle and one product handle
  c_handle = (isArray(c_handle) ? c_handle[0] : c_handle) as string
  p_handle = (isArray(p_handle) ? p_handle[0] : p_handle) as string

  // Use `getServerSideProps` from main product page
  const pageProps = await getServerSideProductPageProps({
    ...context,
    query: { handle: p_handle, sku: query.sku }
  })

  // If error is caught, return pageProps
  if ((pageProps.props.page as FeathersErrorJSON)?.code) return pageProps

  // Initialize service
  const Collections = new CollectionService()

  // Get product collection title
  const { title: c_title } = await Collections.getByHandle(c_handle)

  // Get data for template
  const page: ProductTemplateProps = {
    ...((pageProps.props.page || {}) as ProductTemplateProps),
    collection: { href: `collections/${c_handle}`, title: c_title }
  }

  // Return page component props and user session
  return { props: { page, session: pageProps.props.session } }
}

export default CollectionProduct
