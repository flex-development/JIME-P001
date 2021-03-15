import type {
  IPagePropsProduct as PageProps,
  NextIncomingMessage,
  NotFound,
  PageComponent,
  ProductPageParams as Params,
  ProductPageUrlQuery as Query
} from '@app/types'
import { serialize } from '@flex-development/json/utils/serialize'
import kapi from '@kustomzcore/config/axios-kapi'
import type {
  GetCollectionResJSON,
  GetProductResJSON,
  ProductListingData
} from '@kustomzcore/types'
import {
  ProductTemplate,
  ProductTemplateProps as TemplateProps
} from '@kustomzdesign/lib/templates/ProductTemplate'
import { pick } from 'lodash'
import findIndex from 'lodash/findIndex'
import type {
  GetServerSideProps,
  GetServerSidePropsContext as Context,
  GetServerSidePropsResult
} from 'next'
import type { ReactElement } from 'react'

/**
 * @file Page - Collection Product
 * @module pages/collections/[collection]/products/[product]
 */

/**
 * Renders a collection product page.
 *
 * @param {PageProps} props - Page component props
 * @param {TemplateProps} props.template - Template component properties
 * @return {ReactElement<TemplateProps>} Collection product page
 */
const CollectionProduct: PageComponent<PageProps> = (
  props: PageProps
): ReactElement<TemplateProps> => {
  return <ProductTemplate {...props.template} />
}

/**
 * Fetches the data required to display a product or collection product listing
 * using the `ProductTemplate` component.
 *
 * @todo Change collection link for `ProductBreadcrumb` using {@param req.url}
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/sales-channels
 *
 * @param {Context<Params>} context - Server side page context
 * @param {Query} context.query - Query parameters
 * @param {NextIncomingMessage} context.req - `HTTP` request object
 * @return {Promise<GetServerSidePropsResult<PageProps>>} Page props
 * @throws {FeathersErrorJSON}
 */
export const getServerSideProps: GetServerSideProps<PageProps, Query> = async (
  context: Context<Params>
): Promise<GetServerSidePropsResult<PageProps>> => {
  const { query, req } = context
  const { collection, product, sku } = query as Query

  let data: GetProductResJSON | NotFound = { notFound: true }
  let data_collection: GetCollectionResJSON | NotFound = { notFound: true }

  try {
    data = await kapi<GetProductResJSON>({
      params: {
        fields: 'available,body_html,handle,images,seo,tags,title,variants',
        sku
      },
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
        product: pick(data, [
          'body_html',
          'handle',
          'images',
          'title',
          'variants'
        ]) as ProductListingData,
        reviews: []
      })
    }
  }
}

export default CollectionProduct
