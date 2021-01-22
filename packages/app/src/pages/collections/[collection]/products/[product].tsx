import { ProductTemplate } from '@components/templates/ProductTemplate'
import { serialize } from '@flex-development/json/utils/serialize'
import type { ICollectionListing } from '@flex-development/kustomzcore/types'
import type { GetProductResJSON, SEOData } from '@kapi/types'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  IPagePropsProduct as PageProps,
  NotFound,
  PageComponent,
  ProductPageParams,
  ProductPageUrlQuery
} from '@subdomains/app/types'
import getLayoutData from '@subdomains/app/utils/getLayoutData'
import getCollection from '@subdomains/sales/utils/getCollection'
import getProduct from '@subdomains/sales/utils/getProduct'
import findIndex from 'lodash/findIndex'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Page - Collection Product
 * @module pages/collections/[collection]/products/[product]
 */

/**
 * Renders a collection product page.
 *
 * @param props - Page component props
 * @param props.layout - Data to populate `AppLayout` component
 * @param props.seo - `SEO` component properties
 * @param props.template - `ProductTemplate` component properties
 */
const CollectionProduct: PageComponent<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <ProductTemplate {...template} />
  </>
)

/**
 * Fetches the data required to display a product or collection product listing
 * using the `ProductTemplate` component.
 *
 * @todo Change collection link for `ProductBreadcrumb` using {@param req.url}
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
  ProductPageUrlQuery
> = async (context: GetServerSidePropsContext<ProductPageParams>) => {
  const {
    collection: chandle,
    product: phandle,
    sku
  } = context.query as ProductPageUrlQuery

  // Get product data
  const data = await getProduct({
    fields: 'body_html,images,seo,variants,title',
    handle: phandle,
    sku
  })

  // If product isn't found, show 404 layout
  if ((data as NotFound).notFound) return data as NotFound

  // ! Guarenteed to be product data. Error will be thrown otherwise
  const { seo, ...product } = data as GetProductResJSON

  // Get product collection title
  let collection = await getCollection({ handle: chandle })

  // If collection isn't found, show 404 layout
  if ((collection as NotFound).notFound) return collection as NotFound

  // ! Guarenteed to be collection data. Error will be thrown otherwise
  collection = collection as ICollectionListing

  // Get data for template
  const template = serialize<PageProps['template']>({
    active: findIndex(
      product.variants,
      product.variants?.find(variant => variant.sku === sku)
    ),
    // TODO: Change collection link using req.url
    collection: { href: '/products', title: 'Products' },
    product,
    reviews: []
  })

  // Get layout data
  const layout = await getLayoutData()

  return { props: { layout, seo: seo as NonNullable<SEOData>, template } }
}

export default CollectionProduct
