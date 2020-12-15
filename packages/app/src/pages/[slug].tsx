import { database } from '@app/subdomains/firebase'
import {
  PageTemplate,
  PageTemplateProps
} from '@flex-development/kustomzdesign'
import { CMSPageParams, IPagePropsCMS, PC, SEO } from '@subdomains/app'
import { getCMSPageSEO, ICMSPage, PageService } from '@subdomains/cms'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { getStaticProps as getStaticPropsGlobal } from './index'
/**
 * @file Page - Slug (CMS)
 * @module pages/slug
 * @see https://nextjs.org/docs/basic-features/data-fetching
 */

// Initialize services
const Pages = new PageService(database)

/**
 * Renders a CMS page.
 *
 * The value of {@param props.page.component} will be always be `PageTemplate`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.component - Display name of template component
 * @param props.page.content - `PageTemplate` component props
 * @param props.page.draft - True if page is in draft mode
 * @param props.page.id - Unique page entity ID
 * @param props.page.keywords - Comma-delimitted list of SEO keywords
 * @param props.page.path - URL path page can be accessed from
 * @param props.page.title - Title of page
 * @param props.page.uuid - Unique page entity UUID
 * @param props.preview - True if CMS is enabled
 * @param props.session - CMS user session or null
 */
const Slug: PC<IPagePropsCMS> = ({ page }) => (
  <>
    <SEO {...getCMSPageSEO(page)} />
    <PageTemplate {...(page.content as PageTemplateProps)} />
  </>
)

/**
 * Returns an object containing the dynamic route parameters of each page that
 * should be pre-rendered.
 *
 * Any paths not returned will result in a 404 page.
 */
export const getStaticPaths: GetStaticPaths<CMSPageParams> = async () => {
  // Get pages in database
  const pages = (await Pages.find()) as Array<ICMSPage>

  // Get pages to pre-render
  const paths = pages.map(({ path }) => {
    return { params: { slug: path === '/' ? 'index' : path.replace('/', '') } }
  })

  // Return paths to prerender and redirect other routes to 404
  return { fallback: false, paths }
}

/**
 * Retrieves the data for the `PageTemplate`.
 *
 * @param context - Next.js page component context
 * @param context.params - Dynamic route parameters
 * @param context.preview - `true` if in preview mode, `undefined` otherwise
 * @param context.previewData - Preview data set by `setPreviewData`
 * @returns Template data and current user session
 */
export const getStaticProps: GetStaticProps<
  IPagePropsCMS,
  CMSPageParams
> = async (context: GetStaticPropsContext<CMSPageParams>) => {
  // Return page component props
  return getStaticPropsGlobal(context)
}

export default Slug
