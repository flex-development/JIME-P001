import { getGlobalMetafields } from '@app/subdomains/metafields/utils'
import { ErrorTemplate, Link, Paragraph } from '@flex-development/kustomzdesign'
import { IPageProps as PageProps, PC } from '@subdomains/app/interfaces'
import { GetStaticProps } from 'next'
import NextHead from 'next/head'
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
    <NextHead>
      <title>Page Not Found | Morena&#39;s Kustomz</title>
    </NextHead>
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
 * Fetches the data required to pre-render the 404 page.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @async
 */
export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return { props: { globals: await getGlobalMetafields() }, revalidate: 1 }
}

export default NotFound
