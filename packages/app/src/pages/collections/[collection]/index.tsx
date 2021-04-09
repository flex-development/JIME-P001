import type {
  CollectionPageParams as Params,
  IPagePropsCollection as PageProps,
  NextIncomingMessage,
  NotFound,
  PageComponent
} from '@app/types'
import kapi from '@core/config/axios-kapi'
import type { APIPayload, ProductListingData } from '@core/types'
import type { LinkProps } from '@design/lib/atoms/Link'
import {
  CollectionTemplate,
  CollectionTemplateProps as TemplateProps
} from '@design/lib/templates/CollectionTemplate'
import { serialize } from '@flex-development/json/utils/serialize'
import merge from 'lodash/merge'
import type {
  GetServerSideProps,
  GetServerSidePropsContext as Context,
  GetServerSidePropsResult
} from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

/**
 * @file Page - Product Collection
 * @module pages/collections/[collection]
 */

/**
 * Renders a product collection page.
 *
 * @param {PageProps} props - Page component props
 * @param {TemplateProps} props.template - Template component properties
 * @return {ReactElement<TemplateProps>} Product colletion page
 */
const Collection: PageComponent<PageProps> = (
  props: PageProps
): ReactElement<TemplateProps> => {
  const { template } = props

  // Get router instance to generate `LinkProps` for each collection product
  const { asPath, query } = useRouter()

  /**
   * Generates product `LinkProps` using the `handle` of the current collection.
   *
   * @param {ProductListingData} p - Product listing data
   * @return {LinkProps} `LinkProps` for the product listing
   */
  const handleProductLink = (p: ProductListingData): LinkProps => {
    const base = !asPath.includes('collections') ? '/' : `${query.collection}/`
    return { href: `${base}products/${p.handle}` }
  }

  return (
    <CollectionTemplate {...template} handleProductLink={handleProductLink} />
  )
}

/**
 * Fetches the data required to display a collection using the
 * `CollectionTemplate` component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/sales-channels
 *
 * @async
 * @param {Context<Params>} context - Server side page context
 * @param {Params} context.params - Route parameters if dynamic route
 * @param {NextIncomingMessage} context.req - `HTTP` request object
 * @return {Promise<GetServerSidePropsResult<PageProps>>} Page props
 * @throws {ErrorJSON}
 */
export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (
  context: Context<Params>
): Promise<GetServerSidePropsResult<PageProps>> => {
  const { params, req } = context

  let data: APIPayload.Collection | NotFound = { notFound: true }

  try {
    data = await kapi<APIPayload.Collection>({
      params: { fields: 'body_html,products,seo,title' },
      url: `/collections/${params?.handle}`
    })
  } catch (error) {
    if (error.code === 404) return data as NotFound
    throw error
  }

  return {
    props: {
      seo: merge(data.seo, {
        title: req.url === '/products' ? 'All Products' : data.seo?.title
      }),
      template: serialize<PageProps['template']>({
        collection: {
          body_html: data.body_html,
          title: !req.url?.includes('collections') ? 'Products' : data.title
        },
        products: data.products
      })
    }
  }
}

export default Collection
