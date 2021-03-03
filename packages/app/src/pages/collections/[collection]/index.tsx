import { SEO } from '@app/components/SEO'
import kapi from '@app/config/axios-kapi'
import type {
  CollectionPageParams,
  IPagePropsCollection as PageProps,
  NotFound,
  PageComponent
} from '@app/types'
import { serialize } from '@flex-development/json/utils/serialize'
import type { GetCollectionResJSON } from '@kustomzcore/types'
import { CollectionTemplate } from '@kustomzdesign/lib/templates/CollectionTemplate'
import merge from 'lodash/merge'
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
 * @param context.req - `HTTP` request object
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
  CollectionPageParams
> = async (context: GetServerSidePropsContext<CollectionPageParams>) => {
  const { params, req } = context

  let data: GetCollectionResJSON | NotFound = { notFound: true }

  try {
    data = await kapi<GetCollectionResJSON>({
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
          ...data,
          title: !req.url?.includes('collections') ? 'Products' : data.title
        } as PageProps['template']['collection'],
        products: data.products
      })
    }
  }
}

export default Collection
