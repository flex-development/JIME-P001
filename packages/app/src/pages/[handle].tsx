import { getSEOData, HandlePageParams } from '@app/subdomains/app/utils'
import { PageService } from '@app/subdomains/cms/services'
import { getGlobalMetafields } from '@app/subdomains/metafields/utils'
import { IPage } from '@flex-development/kustomzcore'
import {
  PageTemplate,
  PageTemplateProps
} from '@flex-development/kustomzdesign'
import { SEO, SEOProps } from '@subdomains/app/components'
import { IPagePropsHandle, PC } from '@subdomains/app/interfaces'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

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
const HandlePage: PC<IPagePropsHandle> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <PageTemplate {...template} />
  </>
)

/**
 * Returns an array of routes to pre-render.
 *
 * @async
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // Initialize services
  const Pages = new PageService()

  // Get all pages
  let pages = (await Pages.find()) as IPage[]

  // Filter pages
  pages = pages.filter(page => !['api-menus', 'index'].includes(page.handle))

  // Return pre-render config
  return {
    fallback: false,
    paths: pages.map(page => ({ params: { handle: page.handle } }))
  }
}

/**
 * Fetches the data required to pre-render an online store page.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 *
 * @async
 * @param context - Next.js page component context
 * @param context.params - Dynamic route parameters
 * @param context.preview - `true` if preview enabled, `undefined` otherwise
 * @param context.previewData - Preview data set by `setPreviewData`
 */
export const getStaticProps: GetStaticProps<
  IPagePropsHandle,
  HandlePageParams
> = async (context: GetStaticPropsContext<HandlePageParams>) => {
  // Initialize services
  const Pages = new PageService()

  // Initialize page data object
  let page: IPage | null = null

  try {
    // Get page data
    page = (await Pages.get(context.params?.handle ?? '')) as IPage
  } catch (error) {
    // Redirect to /404 if page data isn't found
    if (error.code === 404) return { notFound: true }
    throw error
  }

  // Restrict access to Menus API page
  if (page.handle === 'api-menus') return { notFound: true }

  // Get `PageTemplate` props
  const template: PageTemplateProps = { body: page.body_html }

  // Get global metafields
  const globals = await getGlobalMetafields()

  // Get SEO object
  const seo: SEOProps = await getSEOData(globals, page, 'page')

  return { props: { globals, page, seo, template }, revalidate: 1 }
}

export default HandlePage
