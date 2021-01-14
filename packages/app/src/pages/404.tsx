import { Link } from '@lib/atoms/Link'
import { Paragraph } from '@lib/atoms/Paragraph'
import { ErrorTemplate } from '@lib/templates/ErrorTemplate'
import { SEO } from '@subdomains/app/components/SEO'
import { IPageProps as PageProps, PC } from '@subdomains/app/interfaces'
import globalMetafields from '@subdomains/metafields/utils/globalMetafields'
import { GetStaticProps } from 'next'
import { Fragment } from 'react'

/**
 * @file Custom 404 page
 * @module pages/404
 */

/**
 * Renders a `404` error page.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 */
const NotFound: PC = () => (
  <Fragment>
    <SEO title='Page Not Found' />
    <ErrorTemplate
      code={404}
      message="Sorry, the page you're looking for does not exist."
    >
      <Paragraph $color='white'>
        {/* eslint-disable-next-line prettier/prettier */}
        Go{' '}
        <Link $color='secondary' href='/'>
          home
        </Link>{' '}
        and smoke or something.
      </Paragraph>
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
  return { props: { globals: await globalMetafields() }, revalidate: 1 }
}

export default NotFound
