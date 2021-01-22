import { CollectionTemplate } from '@components/templates/CollectionTemplate'
import { serialize } from '@flex-development/json/utils/serialize'
import type { GetCollectionResJSON, SEOData } from '@kapi/types'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  CollectionPageParams,
  IPagePropsCollection as PageProps,
  NotFound,
  PageComponent
} from '@subdomains/app/types'
import getLayoutData from '@subdomains/app/utils/getLayoutData'
import getCollection from '@subdomains/sales/utils/getCollection'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

/**
 * @file Page - Product Collection
 * @module pages/collections/[collection]
 */

/**
 * Renders a product collection page.
 *
 * @param props - Page component props
 * @param props.layout - Data to populate `AppLayout` component
 * @param props.seo - `SEO` component properties
 * @param props.template - `CollectionTemplate` component properties
 */
const Collection: PageComponent<PageProps> = ({ seo, template }) => {
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
  // Get collection handle and current page URL
  const { collection: handle = '' } = context.params as CollectionPageParams
  const { url } = context.req

  // Get collection data
  const data = await getCollection({
    fields: 'body_html,products,seo,title',
    handle
  })

  // Redirect to /404 if page data isn't found
  if ((data as NotFound).notFound) return data as NotFound

  // ! Guarenteed to be collection page. Error will be thrown otherwise
  const { body_html, products, title } = data as GetCollectionResJSON
  const seo = (data as GetCollectionResJSON).seo as NonNullable<SEOData>

  // Get template data
  const template = serialize<PageProps['template']>({
    collection: {
      body_html,
      title: !url?.includes('collections') ? 'Products' : title
    },
    products
  })

  // Get layout data
  const layout = await getLayoutData()

  return {
    props: {
      layout,
      seo: {
        ...seo,
        title: url === '/products' ? 'All Products' : seo?.title
      },
      template
    }
  }
}

export default Collection
