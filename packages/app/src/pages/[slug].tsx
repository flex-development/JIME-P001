import { database } from '@app/config/firebase'
import {
  IPageProps,
  Logger,
  PC,
  serialize,
  ServerSidePageProps
} from '@app/subdomains/app'
import { ICMSPage } from '@app/subdomains/cms'
import { PageService } from '@app/subdomains/cms/services'
import { FeathersErrorJSON } from '@feathersjs/errors'
import {
  PageTemplate,
  PageTemplateProps
} from '@flex-development/kustomzdesign'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import React from 'react'

/**
 * @file Slug (CMS) pages
 * @module pages/handle
 */

/**
 * Renders a CMS page.
 * The value of {@param props.page.component} will always be `PageTemplate`.
 *
 * @param props - Page component props
 * @param props.page - Page data
 * @param props.page.component - Display name of template component
 * @param props.page.content - Template component props
 * @param props.page.draft - True if page is in draft mode
 * @param props.page.metadata - SEO metadata
 * @param props.page.path - Page path
 * @param props.page.title - Page title
 * @param props.session - Current user session or null
 */
const Slug: PC = ({ page }: IPageProps) => {
  const { content } = page as ICMSPage
  return <PageTemplate {...(content as PageTemplateProps)} />
}

/**
 * Retrieves the current user session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param context - Next.js page component context
 * @param context.req - HTTP request object
 * @returns Current user session
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
    Logger.error({ 'Slug.getServerSideProps': error })
    return { props: { page: serialize<FeathersErrorJSON>(error), session } }
  }
}

export default Slug
