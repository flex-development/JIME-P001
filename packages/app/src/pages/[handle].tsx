import { SEO } from '@app/components/SEO'
import kapi from '@app/config/axios-kapi'
import type {
  HandlePageParams,
  IPagePropsHandle as PageProps,
  NotFound,
  PageComponent
} from '@app/types'
import type { GetPageResJSON } from '@kapi/types'
import { PageTemplate } from '@kustomzdesign/lib/templates/PageTemplate'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Online Store Page
 * @module pages/[handle]
 */

/**
 * Renders an online store page.
 *
 * @param props - Page component props
 * @param props.seo - `SEO` component properties
 * @param props.template - `PageTemplate` component properties
 */
const HandlePage: PageComponent<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <PageTemplate {...template} />
  </>
)

/**
 * Fetches the data required to render an online store page.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 *
 * @async
 * @param context - Server side page context
 * @param context.params - Route parameters if dynamic route
 * @param context.req - `HTTP` request object
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
  HandlePageParams
> = async (context: GetServerSidePropsContext<HandlePageParams>) => {
  let data: GetPageResJSON | NotFound = { notFound: true }

  try {
    data = await kapi<GetPageResJSON>({
      params: { fields: 'body_html,seo' },
      url: `/pages/${context.params?.handle}`
    })
  } catch (error) {
    if (error.code === 404) return data as NotFound
    throw error
  }

  return {
    props: {
      seo: data.seo as NonNullable<typeof data.seo>,
      template: { body: data.body_html }
    }
  }
}

export default HandlePage
