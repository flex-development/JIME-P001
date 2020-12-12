import ProductPage, {
  getServerSideProps as getServerSideProductPageProps
} from '@app/pages/products/[handle]'
import { ProductTemplateProps } from '@flex-development/kustomzdesign'
import {
  CollectionProductPageParams,
  CollectionProductPageUrlQuery,
  IPagePropsProduct,
  NotFound,
  PC,
  ProductPageParams,
  ServerSidePageProps
} from '@subdomains/app'
import { CollectionService } from '@subdomains/sales'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ICollectionListing } from 'shopify-api-node'

/**
 * @file Page - Collection Product
 * @module pages/collections/collection/products/product
 */

/**
 * Renders a collection product page.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.collection - `LinkProps` for product collection
 * @param props.collection.href - Link to collection
 * @param props.collection.title - Title of collection
 * @param props.session - CMS user session or null
 */
const CollectionProduct: PC<IPagePropsProduct> = props => {
  return <ProductPage {...props} />
}

/**
 * Retrieves the data for the `ProductTemplate`.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.params - Route parameters if dynamic route
 * @param context.query - The query string
 * @param context.req - HTTP request object
 * @returns Product listing object and an array of products in the collection
 */
export const getServerSideProps: GetServerSideProps<
  IPagePropsProduct,
  CollectionProductPageUrlQuery
> = async (context: GetServerSidePropsContext<CollectionProductPageParams>) => {
  const {
    collection: chandle,
    product,
    sku
  } = context.query as CollectionProductPageUrlQuery

  // Use `getServerSideProps` from main product page
  const pctx: GetServerSidePropsContext<ProductPageParams> = {
    ...((context as unknown) as GetServerSidePropsContext<ProductPageParams>),
    query: { handle: product, sku }
  }

  // Get page component props
  let pageProps = await getServerSideProductPageProps(pctx)

  // If product isn't found, show 404 layout
  if ((pageProps as NotFound).notFound) return pageProps as NotFound

  // ! Guarenteed to be server side data. Error will be thrown otherwise
  pageProps = pageProps as ServerSidePageProps<IPagePropsProduct>

  // Initialize service
  const Collections = new CollectionService()

  // Get product collection title
  let collection = await Collections.getByHandle(chandle)

  // If collection isn't found, show 404 layout
  if ((collection as NotFound).notFound) return collection as NotFound

  // ! Guarenteed to be collection data. Error will be thrown otherwise
  collection = collection as ICollectionListing

  // Get data for template
  const page: ProductTemplateProps = {
    ...((pageProps.props?.page || {}) as ProductTemplateProps),
    collection: { href: `collections/${chandle}`, title: collection.title }
  }

  // Return page component props and user session
  return { props: { page, session: pageProps.props.session } }
}

export default CollectionProduct
