import { REVIEW_FIELDS } from '@app/config/constants'
import type {
  IPagePropsProduct as PageProps,
  NextIncomingMessage,
  NotFound,
  PageComponent,
  ProductPageParams as Params,
  ProductPageUrlQuery as Query
} from '@app/types'
import kapi from '@core/config/axios-kapi'
import type { APIPayload, ProductListingData } from '@core/types'
import {
  ProductTemplate,
  ProductTemplateProps as TemplateProps
} from '@design/lib/templates/ProductTemplate'
import { serialize } from '@flex-development/json/utils/serialize'
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
 * @throws {ErrorJSON}
 */
export const getServerSideProps: GetServerSideProps<PageProps, Query> = async (
  context: Context<Params>
): Promise<GetServerSidePropsResult<PageProps>> => {
  const { query, req } = context
  const { collection, product, sku } = query as Query

  const cproduct = req.url?.includes(`/collections/${collection}/products/`)

  let data: APIPayload.Product | NotFound = { notFound: true }
  let data_collection: APIPayload.Collection | NotFound = { notFound: true }

  try {
    data = await kapi<APIPayload.Product>({
      params: {
        fields: 'available,body_html,handle,images,seo,tags,title,variants',
        sku
      },
      url: `/products/${product}`
    })

    data_collection = await kapi<APIPayload.Collection>({
      params: { fields: 'title' },
      url: `/collections/${collection}`
    })
  } catch (error) {
    if (error.code === 404) return data as NotFound
    throw error
  }

  return {
    props: {
      seo: data.seo as NonNullable<typeof data.seo>,
      template: serialize<PageProps['template']>({
        active: findIndex(
          data.variants,
          data.variants?.find(variant => variant.sku === sku)
        ),
        collection: {
          href: cproduct ? `/collections/${collection}` : '/products',
          title: cproduct ? data_collection.title : 'Products'
        },
        product: (() => {
          const product = pick(data, [
            'body_html',
            'images',
            'product_id',
            'title',
            'variants'
          ])

          return { ...product, handle: data.objectID } as ProductListingData
        })(),
        reviews: await kapi<PageProps['template']['reviews']>({
          params: { fields: REVIEW_FIELDS, product_id: data.product_id },
          url: '/reviews'
        })
      })
    }
  }
}

export default CollectionProduct
