import { SEO } from '@app/components/SEO'
import kapi from '@app/config/axios-kapi'
import type {
  IPagePropsProduct as PageProps,
  NotFound,
  PageComponent,
  ProductPageParams,
  ProductPageUrlQuery
} from '@app/types'
import { serialize } from '@flex-development/json/utils/serialize'
import type { GetCollectionResJSON, GetProductResJSON } from '@kapi/types'
import type { IProductListing } from '@kustomzcore'
import { ProductTemplate } from '@kustomzdesign/lib/templates/ProductTemplate'
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
 * @param context.req - `HTTP` request object
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
  ProductPageUrlQuery
> = async ({ query, req }: GetServerSidePropsContext<ProductPageParams>) => {
  const { collection, product, sku } = query as ProductPageUrlQuery

  let data: GetProductResJSON | NotFound = { notFound: true }
  let data_collection: GetCollectionResJSON | NotFound = { notFound: true }

  try {
    data = await kapi<GetProductResJSON>({
      params: { fields: 'body_html,handle,images,seo,variants,title', sku },
      url: `/products/${product}`
    })

    data_collection = await kapi<GetCollectionResJSON>({
      params: { fields: 'title' },
      url: `/collections/${collection}`
    })
  } catch (error) {
    if (error.code === 404) return data as NotFound
    throw error
  }

  const c_product = req.url?.includes(`/collections/${collection}/products/`)

  return {
    props: {
      seo: data.seo as NonNullable<typeof data.seo>,
      template: serialize<PageProps['template']>({
        active: findIndex(
          data.variants,
          data.variants?.find(variant => variant.sku === sku)
        ),
        collection: {
          href: c_product ? `/collections/${collection}` : '/products',
          title: c_product ? data_collection.title : 'Products'
        },
        product: data as IProductListing,
        reviews: []
      })
    }
  }
}

export default CollectionProduct
