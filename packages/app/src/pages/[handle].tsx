import { IPage } from '@flex-development/kustomzcore/types/shopify'
import { PageTemplate } from '@lib/templates/PageTemplate'
import { SEO } from '@subdomains/app/components/SEO'
import { IPagePropsHandle as PageProps, PC } from '@subdomains/app/interfaces'
import getSEO from '@subdomains/app/utils/getSEO'
import transformMDX from '@subdomains/app/utils/transformMDX'
import { HandlePageParams, NotFound } from '@subdomains/app/utils/types'
import getPage from '@subdomains/cms/utils/getPageByHandle'
import globalMetafields from '@subdomains/metafields/utils/globalMetafields'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Online Store Page
 * @module pages/[handle]
 */

/**
 * Renders an online store page.
 *
 * @param props - Page component props
 * @param props.globals - Shopify `globals` namespace metafields obj
 * @param props.page - Shopify API page resource data
 * @param props.seo - `SEO` component properties
 * @param props.template - `PageTemplate` component properties
 */
const HandlePage: PC<PageProps> = ({ seo, template }) => (
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
  const data = await getPage(context.params?.handle ?? '')

  // Redirect to /404 if page data isn't found
  if ((data as NotFound).notFound) return data as NotFound

  // ! Guarenteed to be page data. Error will be thrown otherwise
  const page = data as PageProps['page']

  // Restrict access to Menus API page
  if (page.handle === 'api-menus') return { notFound: true }

  // Get `PageTemplate` props
  const template: PageProps['template'] = {
    body: (await transformMDX((page as IPage).body_html)).code
  }

  // Get global metafields
  const globals = await globalMetafields()

  // Get SEO object
  const seo = await getSEO(globals, page, 'page')

  return { props: { globals, page, seo, template } }
}

export default HandlePage
