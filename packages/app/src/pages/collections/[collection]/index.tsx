import { serialize } from '@flex-development/json'
import {
  CollectionTemplate,
  CollectionTemplateProps,
  LinkProps
} from '@flex-development/kustomzdesign'
import {
  CollectionPageParams,
  IPagePropsCollection,
  NotFound,
  PC,
  SEO,
  SEOProps
} from '@subdomains/app'
import { CollectionService, ProductService } from '@subdomains/sales'
import { join } from 'lodash'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { ICollectionListing, IProductListing } from 'shopify-api-node'
import stripHtml from 'string-strip-html'

/**
 * @file Page - Product Collection
 * @module pages/collections/collection
 */

/**
 * Renders a product collection.
 * The value of {@param props.session} will always be `null`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.collection - Shopify collection listing object
 * @param props.page.products - Product listings in collection
 * @param props.session - CMS user session or null
 */
const Collection: PC<IPagePropsCollection> = ({ page }) => {
  const {
    body_html,
    default_product_image,
    image: cimage,
    title
  } = page.collection

  // Get router instance to generate `LinkProps` for each collection product
  const { asPath, query } = useRouter()

  /**
   * Generates product `LinkProps` using the `handle` of the current collection.
   *
   * @param product - Product listing object
   * @returns `LinkProps` for the product listing
   */
  const handleProductLink = (product: IProductListing): LinkProps => {
    const base = !asPath.includes('collections') ? '/' : `${query.collection}/`
    return { href: `${base}products/${product.handle}` }
  }

  // Get collection image
  const image = default_product_image || cimage

  // Build keywords from product tags
  const keywords: string[] = []
  page.products?.forEach(product => keywords.concat(product.tags.split(',')))

  // Get SEO metadata
  const seo: SEOProps = {
    description: stripHtml(body_html).result,
    keywords: join(keywords),
    og: {
      image: image.src,
      'image:alt': image.alt || undefined,
      'image:height': image.height,
      'image:secure_url': image.src,
      'image:width': image.width
    },
    title: `Collections - ${title}`,
    twitter: { card: 'summary', image: image.src }
  }

  return (
    <>
      <SEO {...seo} />
      <CollectionTemplate {...page} handleProductLink={handleProductLink} />
    </>
  )
}

/**
 * Retrieves the data for the `CollectionTemplate` and the current CMS user
 * session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.params - Route parameters if dynamic route
 * @param context.req - HTTP request object
 * @returns Collection listing object and an array of products in the collection
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

  // ! Guarenteed to be collection data. Error will be thrown otherwise
  collection = collection as ICollectionListing

  // Get products in collection
  const products = await Products.findByCollection(collection.collection_id)

  // Get template data
  const page = serialize<CollectionTemplateProps>({
    collection: {
      ...collection,
      title: !req.url?.includes('collections') ? 'Products' : collection.title
    },
    products: products as Array<IProductListing>
  })

  // Get current user session
  const session = (await getSession(context)) as IPagePropsCollection['session']

  return { props: { page, session } }
}

export default Collection
