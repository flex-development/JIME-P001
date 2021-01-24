import { ErrorTemplate } from '@components/templates/ErrorTemplate'
import { ErrorContent } from '@subdomains/app/components/ErrorContent'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  IPageProps as PageProps,
  PageComponent
} from '@subdomains/app/types'
import getLayoutData from '@subdomains/app/utils/getLayoutData'
import globalSEO from '@subdomains/app/utils/globalSEO'
import merge from 'lodash/merge'
import type { GetStaticProps } from 'next'
import { Fragment } from 'react'

/**
 * @file Custom 404 page
 * @module pages/404
 */

/**
 * Renders a `404` error page.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 *
 * @param props - Page component props
 * @param props.layout - Data to populate `Layout` component
 * @param props.seo - `SEO` component properties
 */
const NotFound: PageComponent = ({ seo }) => (
  <Fragment>
    <SEO {...seo} />
    <ErrorTemplate
      code={404}
      message="Sorry, the page you're looking for does not exist."
    >
      <ErrorContent />
    </ErrorTemplate>
  </Fragment>
)

/**
 * Fetches the data required to render the 404 page.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @async
 */
export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const seo = merge(await globalSEO(), { title: 'Page Not Found' })
  return { props: { layout: await getLayoutData(), seo }, revalidate: 1 }
}

export default NotFound
