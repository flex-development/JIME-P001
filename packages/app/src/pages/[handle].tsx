import { PageTemplate } from '@components/templates/PageTemplate'
import type { GetPageResJSON, SEOData } from '@kapi/types'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  HandlePageParams,
  IPagePropsHandle as PageProps,
  NotFound,
  PageComponent
} from '@subdomains/app/types'
import getLayoutData from '@subdomains/app/utils/getLayoutData'
import getPage from '@subdomains/cms/utils/getPage'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Online Store Page
 * @module pages/[handle]
 */

/**
 * Renders an online store page.
 *
 * @param props - Page component props
 * @param props.layout - Data to populate `AppLayout` component
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
 * @param context.query - The query string
 * @param context.req - HTTP request object
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
  HandlePageParams
> = async (context: GetServerSidePropsContext<HandlePageParams>) => {
  // Get page data
  const data = await getPage({
    fields: 'body_html,seo',
    handle: context.params?.handle ?? ''
  })

  // Redirect to /404 if page data isn't found
  if ((data as NotFound).notFound) return data as NotFound

  // ! Guarenteed to be page data. Error will be thrown otherwise
  const { body_html: body, seo } = data as GetPageResJSON

  // Get `PageTemplate` props
  const template: PageProps['template'] = { body }

  // Get layout data
  const layout = await getLayoutData()

  return { props: { layout, seo: seo as NonNullable<SEOData>, template } }
}

export default HandlePage
