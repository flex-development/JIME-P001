import { serialize } from '@flex-development/json/utils/serialize'
import { CollectionTemplate } from '@lib/templates/CollectionTemplate'
import { SEO } from '@subdomains/app/components/SEO'
import {
  IPagePropsCollection as PageProps,
  PC
} from '@subdomains/app/interfaces'
import getSEO from '@subdomains/app/utils/getSEO'
import { CollectionPageParams, NotFound } from '@subdomains/app/utils/types'
import globalMetafields from '@subdomains/metafields/utils/globalMetafields'
import findProducts from '@subdomains/sales/utils/findProductsByCollection'
import getCollection from '@subdomains/sales/utils/getCollectionByHandle'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

/**
 * @file Page - Product Collection
 * @module pages/collections/[collection]
 */

/**
 * Renders a product collection page.
 *
 * @param props - Page component props
 * @param props.collection - Shopify API collection listing resource data
 * @param props.globals - Shopify `globals` namespace metafields obj
 * @param props.seo - `SEO` component properties
 * @param props.template - `CollectionTemplate` component properties
 */
const Collection: PC<PageProps> = ({ seo, template }) => {
  // Get router instance to generate `LinkProps` for each collection product
  const { asPath, query } = useRouter()

  /**
   * Generates product `LinkProps` using the `handle` of the current collection.
   *
   * @param p - Product listing object
   * @return `LinkProps` for the product listing
   */
  const handleProductLink: PageProps['template']['handleProductLink'] = p => {
    const base = !asPath.includes('collections') ? '/' : `${query.collection}/`
    return { href: `${base}products/${p.handle}` }
  }

  return (
    <>
      <SEO {...seo} />
      <CollectionTemplate {...template} handleProductLink={handleProductLink} />
    </>
  )
}

/**
 * Fetches the data required to display a collection using the
 * `CollectionTemplate` component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/sales-channels
 *
 * @param context - Server side page context
 * @param context.params - Route parameters if dynamic route
 * @param context.req - HTTP request object
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
  CollectionPageParams
> = async (context: GetServerSidePropsContext<CollectionPageParams>) => {
  const { req, params = {} } = context

  // Get collection handle
  const { collection: handle = '' } = params as CollectionPageParams

  // Get collection data
  let collection = await getCollection(handle)

  // If collection isn't found, show 404 layout
  if ((collection as NotFound).notFound) return collection as NotFound

  // ! Guarenteed to be collection page. Error will be thrown otherwise
  collection = collection as PageProps['collection']

  // Get products in collection
  const c_products = await findProducts(collection.collection_id)
  const products = c_products as NonNullable<PageProps['template']['products']>

  // Get template data
  const template = serialize<PageProps['template']>({
    collection: {
      ...collection,
      title: !req.url?.includes('collections') ? 'Products' : collection.title
    },
    products
  })

  // Get global metafields
  const globals = await globalMetafields()

  // Get SEO object
  const seo = await getSEO(globals, { ...collection, products }, 'collection')

  // Update seo title
  if (req.url === '/products') seo.title = 'All Products'

  return { props: { collection, globals, seo, template } }
}

export default Collection
