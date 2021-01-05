import { getCMSPageSEO } from '@app/subdomains/cms'
import { PageTemplate } from '@flex-development/kustomzdesign'
import { CMSPageParams, IPagePropsSlug, PC, SEO } from '@subdomains/app'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { getServerSideProps as ssp } from './index'

/**
 * @file Page - Slug (CMS)
 * @module pages/slug
 * @see https://nextjs.org/docs/basic-features/data-fetching
 */

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
const Slug: PC<IPagePropsSlug> = ({ page }: IPagePropsSlug) => (
  <>
    <SEO {...getCMSPageSEO(page)} />
    <PageTemplate {...page.content} />
  </>
)

/**
 * Retrieves the data for the `PageTemplate`.
 *
 * @param context - Next.js page component context
 * @param context.params - Dynamic route parameters
 * @param context.query - The query string
 * @param context.req - HTTP request object
 * @return Template data and current user session
 */
export const getServerSideProps: GetServerSideProps<
  IPagePropsSlug,
  CMSPageParams
> = async (context: GetServerSidePropsContext<CMSPageParams>) => {
  return (await ssp(context)) as GetServerSidePropsResult<IPagePropsSlug>
}

export default Slug
