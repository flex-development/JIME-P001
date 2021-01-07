import { getSEOData } from '@app/subdomains/app/utils/getSEOData'
import { getGlobalMetafields } from '@app/subdomains/metafields/utils/getGlobalMetafields'
import { serialize } from '@flex-development/json'
import {
  ICollectionListing,
  IProductListing
} from '@flex-development/kustomzcore'
import {
  CollectionTemplateProps,
  LinkProps
} from '@flex-development/kustomzdesign'
import {
  CollectionPageParams,
  IPagePropsCollection,
  NotFound,
  PC,
  SEO
} from '@subdomains/app'
import { CollectionService, ProductService } from '@subdomains/sales/services'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

/**
 * @file Page - Product Collection
 * @module pages/collections/collection
 */

const CollectionTemplate = dynamic(async () => {
  return (await import('@flex-development/kustomzdesign')).CollectionTemplate
})

/**
 * Renders a product collection.
 *
 * @param props - Page component props
 * @param props.globals - Shopify `globals` namespace metafields obj
 * @param props.page - Shopify API collection listing resource data
 * @param props.seo - `SEO` component properties
 * @param props.template - `CollectionTemplate` component properties
 */
const Collection: PC<IPagePropsCollection> = ({ seo, template }) => {
  // Get router instance to generate `LinkProps` for each collection product
  const { asPath, query } = useRouter()

  /**
   * Generates product `LinkProps` using the `handle` of the current collection.
   *
   * @param product - Product listing object
   * @return `LinkProps` for the product listing
   */
  const handleProductLink = (product: IProductListing): LinkProps => {
    const base = !asPath.includes('collections') ? '/' : `${query.collection}/`
    return { href: `${base}products/${product.handle}` }
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
 * @param context - Next.js page component context
 * @param context.params - Route parameters if dynamic route
 * @param context.req - HTTP request object
 */
export const getServerSideProps: GetServerSideProps<
  IPagePropsCollection,
  CollectionPageParams
> = async (context: GetServerSidePropsContext<CollectionPageParams>) => {
  const { req, params = {} } = context

  const { collection: handle = '' } = params as CollectionPageParams

  // Initialize services
  const Collections = new CollectionService()
  const Products = new ProductService()

  // Get collection title to build collection link
  let collection = await Collections.getByHandle(handle)

  // If collection isn't found, show 404 layout
  if ((collection as NotFound).notFound) return collection as NotFound

  // ! Guarenteed to be collection page. Error will be thrown otherwise
  collection = collection as ICollectionListing

  // Get products in collection
  const c_products = await Products.findByCollection(collection.collection_id)
  const products = c_products as IProductListing[]

  // Get template data
  const template = serialize<CollectionTemplateProps>({
    collection: {
      ...collection,
      title: !req.url?.includes('collections') ? 'Products' : collection.title
    },
    products
  })

  // Get global metafields
  const globals = await getGlobalMetafields()

  // Get SEO object
  const seo = await getSEOData(
    globals,
    { ...collection, products },
    'collection'
  )

  // Update seo title
  if (req.url === '/products') seo.title = 'All Products'

  return { props: { globals, page: collection, seo, template } }
}

export default Collection
