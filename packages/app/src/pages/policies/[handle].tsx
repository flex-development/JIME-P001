import { PageTemplate } from '@components/templates/PageTemplate'
import type { GetPolicyResJSON, SEOData } from '@kapi/types'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  HandlePageParams,
  IPagePropsPolicy as PageProps,
  NotFound,
  PageComponent
} from '@subdomains/app/types'
import getLayoutData from '@subdomains/app/utils/getLayoutData'
import getPolicy from '@subdomains/store/utils/getPolicy'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Store Policy Page
 * @module pages/policies/[handle]
 */

/**
 * Renders a store policy page.
 *
 * @param props - Page component props
 * @param props.layout - Data to populate `AppLayout` component
 * @param props.seo - `SEO` component properties
 * @param props.template - `PageTemplate` component properties
 */
const Policy: PageComponent<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <PageTemplate {...template} />
  </>
)

/**
 * Fetches the data required to render a store page using the `PageTemplate`
 * component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
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
  // Get policy page data
  const data = await getPolicy({
    fields: 'body,seo',
    handle: context.params?.handle ?? ''
  })

  // Redirect to /404 if policy page data isn't found
  if ((data as NotFound).notFound) return data as NotFound

  // ! Guarenteed to be policy page data. Error will be thrown otherwise
  const { body, seo } = data as GetPolicyResJSON

  // Get `PageTemplate` props
  const template: PageProps['template'] = { body }

  // Get layout data
  const layout = await getLayoutData()

  return { props: { layout, seo: seo as NonNullable<SEOData>, template } }
}

export default Policy
