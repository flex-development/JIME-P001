import { database } from '@app/subdomains/firebase/config/web'
import {
  PageTemplate,
  PageTemplateProps
} from '@flex-development/kustomzdesign'
import { CMSPageParams, IPagePropsCMS, PC, SEO } from '@subdomains/app'
import { getCMSPageSEO, PageService } from '@subdomains/cms'
import { ProductService, ReviewService } from '@subdomains/sales'
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'
import {
  getStaticPaths as getStaticPathsGlobal,
  getStaticProps as getStaticPropsGlobal
} from './index'

/**
 * @file Page - Slug (CMS)
 * @module pages/slug
 * @see https://nextjs.org/docs/basic-features/data-fetching
 */

// Initialize services
const Pages = new PageService(database)
const ProductReviews = new ReviewService(database)
const Products = new ProductService()

/**
 * Renders a CMS page.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.component - Display name of template component
 * @param props.page.content - `IndexTemplate` or `PageTemplate` component props
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
 *
 * @param context - Static paths context
 */
export const getStaticPaths: GetStaticPaths<CMSPageParams> = async (
  context: GetStaticPathsContext
) => {
  // Return paths to prerender and redirect other routes to 404
  return getStaticPathsGlobal(context)
}

/**
 * Retrieves the data for the `IndexTemplate` or `PageTemplate` and the current
 * CMS user session.
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
