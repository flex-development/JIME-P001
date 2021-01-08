import ProductPage, {
  getServerSideProps as getSSProps
} from '@app/pages/products/[handle]'
import { ICollectionListing } from '@flex-development/kustomzcore'
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
import { CollectionService } from '@subdomains/sales/services/CollectionService'
import { pick } from 'lodash'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Page - Collection Product
 * @module pages/collections/[collection]/products/[product]
 */

/**
 * Renders a collection product page.
 *
 * @param props - Page component props
 * @param props.globals - Shopify `globals` namespace metafields obj
 * @param props.page - Page data
 * @param props.collection - `LinkProps` for product collection
 * @param props.collection.href - Link to collection
 * @param props.collection.title - Title of collection
 */
const CollectionProduct: PC<IPagePropsProduct> = props => {
  return <ProductPage {...props} />
}

/**
 * Fetches the data required to display a collection product listing using the
 * `ProductTemplate` component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/sales-channels
 *
 * @param context - Next.js page component context
 * @param context.params - Route parameters if dynamic route
 * @param context.query - The query string
 * @param context.req - HTTP request object
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
  let pageProps = await getSSProps(pctx)

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
  const template: ProductTemplateProps = {
    ...((pageProps.props?.template || {}) as ProductTemplateProps),
    collection: { href: `collections/${chandle}`, title: collection.title }
  }

  return {
    props: { ...pick(pageProps.props, ['globals', 'product', 'seo']), template }
  }
}

export default CollectionProduct
