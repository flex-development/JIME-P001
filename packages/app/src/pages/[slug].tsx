import { database } from '@app/config/firebase'
import { IPagePropsSlug, PC, SEO, ServerSide404 } from '@app/subdomains/app'
import { getCMSPageSEO, ICMSPageSlug, PageService } from '@app/subdomains/cms'
import { PageTemplate } from '@flex-development/kustomzdesign'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'

/**
 * @file Page - Slug (CMS)
 * @module pages/slug
 */

/**
 * Renders a CMS page.
 * The value of {@param props.page.component} will always be `PageTemplate`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.component - Display name of template component
 * @param props.page.content - `PageTemplate` component props
 * @param props.page.draft - True if page is in draft mode
 * @param props.page.metadata - SEO metadata
 * @param props.page.path - URL path page can be accessed from
 * @param props.page.title - Title of page
 * @param props.preview - True if CMS is enabled
 * @param props.session - CMS user session or null
 */
const Slug: PC<IPagePropsSlug> = ({ page }) => {
  return (
    <>
      <SEO {...getCMSPageSEO(page)} />
      <PageTemplate {...page.content} />
    </>
  )
}

/**
 * Retrieves the data for the `PageTemplate` and the current CMS user session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.req - HTTP request object
 * @returns Template data and current user session
 */
export const getServerSideProps: GetServerSideProps<IPagePropsSlug> = async (
  context: GetServerSidePropsContext
) => {
  // Initialize services
  const Pages = new PageService(database)

  // Get current user session
  const session = (await getSession(context)) as IPagePropsSlug['session']

  // Get page data. Throws if in draft mode and not signed-in with GitHub
  let page = await Pages.getPage(context.req.url as string, session)

  // If page isn't found, show 404 layout
  if ((page as ServerSide404).notFound) return page as ServerSide404

  // ! Guarenteed to be page data. Error will be thrown otherwise
  page = page as ICMSPageSlug

  // Return page component props
  return { props: { page, session } }
}

export default Slug
