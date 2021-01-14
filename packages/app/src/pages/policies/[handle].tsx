import { PageTemplate } from '@lib/templates/PageTemplate'
import { SEO } from '@subdomains/app/components/SEO'
import { IPagePropsPolicy as PageProps, PC } from '@subdomains/app/interfaces'
import getSEO from '@subdomains/app/utils/getSEO'
import transformMDX from '@subdomains/app/utils/transformMDX'
import { HandlePageParams, NotFound } from '@subdomains/app/utils/types'
import globalMetafields from '@subdomains/metafields/utils/globalMetafields'
import getPolicy from '@subdomains/store/utils/getPolicyByHandle'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Store Policy Page
 * @module pages/policies/[handle]
 */

/**
 * Renders a store policy page page.
 *
 * @param props - Page component props
 * @param props.globals - Shopify `globals` namespace metafields obj
 * @param props.policy - Shopify API page resource data
 * @param props.seo - `SEO` component properties
 * @param props.template - `PageTemplate` component properties
 */
const Policy: PC<PageProps> = ({ seo, template }) => (
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
 * @see
 * https://shopify.dev/docs/admin-api/rest/reference/store-properties/policy
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
  const data = await getPolicy(context.params?.handle ?? '')

  // Redirect to /404 if policy page data isn't found
  if ((data as NotFound).notFound) return data as NotFound

  // ! Guarenteed to be policy page data. Error will be thrown otherwise
  const policy = data as PageProps['policy']

  // Get `PageTemplate` props
  const template: PageProps['template'] = {
    body: (await transformMDX(policy.body)).code
  }

  // Get global metafields
  const globals = await globalMetafields()

  // Get SEO object
  const seo = await getSEO(globals, policy, 'policy')

  return { props: { globals, policy, seo, template } }
}

export default Policy
