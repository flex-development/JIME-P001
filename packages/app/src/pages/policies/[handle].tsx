import HandlePage from '@app/pages/[handle]'
import { getSEOData, HandlePageParams } from '@app/subdomains/app/utils'
import { getGlobalMetafields } from '@app/subdomains/metafields/utils'
import { PolicyService } from '@app/subdomains/store'
import { IPolicy } from '@flex-development/kustomzcore'
import { PageTemplateProps } from '@flex-development/kustomzdesign'
import { SEOProps } from '@subdomains/app/components'
import {
  IPagePropsHandle,
  IPagePropsPolicy,
  PC
} from '@subdomains/app/interfaces'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

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
const Policy: PC<IPagePropsHandle> = props => <HandlePage {...props} />

/**
 * Returns an array of routes to pre-render.
 *
 * @async
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // Initialize services
  const Policies = new PolicyService()

  // Get all policies
  const policies = (await Policies.find()) as IPolicy[]

  // Return pre-render config
  return {
    fallback: false,
    paths: policies.map(policy => ({ params: { handle: policy.handle } }))
  }
}

/**
 * Fetches the data required to pre-render a store page using the `PageTemplate`
 * component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see
 * https://shopify.dev/docs/admin-api/rest/reference/store-properties/policy
 *
 * @async
 * @param context - Next.js page component context
 * @param context.params - Dynamic route parameters
 * @param context.preview - `true` if preview enabled, `undefined` otherwise
 * @param context.previewData - Preview data set by `setPreviewData`
 */
export const getStaticProps: GetStaticProps<
  IPagePropsPolicy,
  HandlePageParams
> = async (context: GetStaticPropsContext<HandlePageParams>) => {
  // Initialize services
  const Policies = new PolicyService()

  // Initialize policy data object
  let policy: IPolicy | null = null

  try {
    // Get policy data
    policy = (await Policies.get(context.params?.handle ?? '')) as IPolicy
  } catch (error) {
    // Redirect to /404 if policy data isn't found
    if (error.code === 404) return { notFound: true }
    throw error
  }

  // Get `PageTemplate` props
  const template: PageTemplateProps = { body: policy.body }

  // Get global metafields
  const globals = await getGlobalMetafields()

  // Get SEO object
  const seo: SEOProps = await getSEOData(globals, policy, 'policy')

  return { props: { globals, policy, seo, template }, revalidate: 1 }
}

export default Policy
