import { IPageProps, PC, ServerSidePageProps } from '@app/subdomains/app'
import { ICMSPage } from '@app/subdomains/cms'
import {
  PageTemplate,
  PageTemplateProps
} from '@flex-development/kustomzdesign'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import React from 'react'

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
const Slug: PC = ({ page }) => {
  const { content } = page as ICMSPage
  return <PageTemplate {...(content as PageTemplateProps)} />
}

/**
 * Retrieves the current user session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param ctx - Next.js page component context
 * @param ctx.req - HTTP request object
 * @returns Current user session
 */
export const getServerSideProps: ServerSidePageProps = async (
  context: GetServerSidePropsContext
) => {
  const session = (await getSession(context)) as IPageProps['session']

  return { props: { page: null, session } }
}

export default Slug
