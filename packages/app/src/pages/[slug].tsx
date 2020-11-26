import { database } from '@app/config/firebase'
import { IPageProps, PC, ServerSidePageProps } from '@app/subdomains/app'
import { ICMSPageSlug } from '@app/subdomains/cms'
import { PageService } from '@app/subdomains/cms/services'
import { PageTemplate } from '@flex-development/kustomzdesign'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import React from 'react'

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
 * @param props.session - Current user session or null
 */
const Slug: PC = ({ page }: IPageProps) => {
  return <PageTemplate {...(page as ICMSPageSlug).content} />
}

/**
 * Retrieves the data for the `PageTemplate` and the current user session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.req - HTTP request object
 * @returns Template data and current user session
 */
export const getServerSideProps: ServerSidePageProps = async (
  context: GetServerSidePropsContext
) => {
  // Initialize services
  const Pages = new PageService(database)

  // Get current user session
  const session = (await getSession(context)) as IPageProps['session']

  try {
    // Get page data. Throws if in draft mode and not signed-in with GitHub
    const entity = await Pages.getPage(context.req.url as string, session)

    // Return page component props
    return { props: { page: entity, session } }
  } catch (error) {
    if (error.code === 404) {
      context.res.setHeader('Location', '/404')
      context.res.statusCode = 302
      context.res.end()
    }

    throw error
  }
}

export default Slug
