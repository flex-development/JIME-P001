import { ErrorTemplate, Link, Paragraph } from '@flex-development/kustomzdesign'
import { NextComponentType, NextPageContext } from 'next'
import NextHead from 'next/head'
import React, { Fragment } from 'react'

/**
 * @file Custom 404 page
 * @module pages/404
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 */

/**
 * Renders a `404` error page.
 *
 * @param props - Page component props
 * @param props.error - Error thrown while building page, or undefined
 */
const NotFound: NextComponentType<NextPageContext> = () => (
  <Fragment>
    <NextHead>
      <title>Page Not Found | Morena&#39;s Kustomz</title>
    </NextHead>
    <ErrorTemplate
      code={404}
      message="Sorry, the page you're looking for does not exist."
    >
      <Paragraph c='white'>
        {/* eslint-disable-next-line prettier/prettier */}
          Go <Link c='secondary' href='/'>home</Link> and smoke or something.
      </Paragraph>
    </ErrorTemplate>
  </Fragment>
)

export default NotFound
