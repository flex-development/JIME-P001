import { ProductTemplate } from '@components/templates/ProductTemplate'
import { serialize } from '@flex-development/json/utils/serialize'
import { ICollectionListing } from '@flex-development/kustomzcore/types/shopify'
import { SEO } from '@subdomains/app/components/SEO'
import { IPagePropsProduct as PageProps, PC } from '@subdomains/app/interfaces'
import getSEO from '@subdomains/app/utils/getSEO'
import {
  CollectionProductPageParams,
  CollectionProductPageUrlQuery,
  NotFound
} from '@subdomains/app/utils/types'
import globalMetafields from '@subdomains/metafields/utils/globalMetafields'
import getCollection from '@subdomains/sales/utils/getCollectionByHandle'
import getProduct from '@subdomains/sales/utils/getProductByHandle'
import findIndex from 'lodash/findIndex'
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
 * @param props.product - Shopify API product listing resource data
 * @param props.seo - `SEO` component properties
 * @param props.template - `ProductTemplate` component properties
 */
const CollectionProduct: PC<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <ProductTemplate {...template} />
  </>
)

/**
 * Fetches the data required to display a product or collection product listing
 * using the `ProductTemplate` component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/sales-channels
 *
 * @async
 * @param context - Server side page context
 * @param context.params - Route parameters if dynamic route
 * @param context.query - The query string
 * @param context.req - HTTP request object
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
  CollectionProductPageUrlQuery
> = async (context: GetServerSidePropsContext<CollectionProductPageParams>) => {
  const {
    collection: chandle,
    product: phandle,
    sku
  } = context.query as CollectionProductPageUrlQuery

  // Get product data
  const data = await getProduct(phandle)

  // If product isn't found, show 404 layout
  if ((data as NotFound).notFound) return data as NotFound

  // ! Guarenteed to be product data. Error will be thrown otherwise
  const product = data as PageProps['product']

  // Get index of active carousel item
  const active = findIndex(
    product.variants,
    product.variants.find(variant => variant.sku === sku)
  )

  // Get product collection title
  let collection = await getCollection(chandle)

  // If collection isn't found, show 404 layout
  if ((collection as NotFound).notFound) return collection as NotFound

  // ! Guarenteed to be collection data. Error will be thrown otherwise
  collection = collection as ICollectionListing

  // Get data for template
  // Build template data object
  // TODO: Change collection link using req.url
  const template = serialize<PageProps['template']>({
    active,
    collection: { href: '/products', title: 'Products' },
    product,
    reviews: []
  })

  // Get global metafields
  const globals = await globalMetafields()

  // Get SEO object
  const seo = await getSEO(globals, { ...product, variant: active }, 'product')

  return { props: { globals, product, seo, template } }
}

export default CollectionProduct
