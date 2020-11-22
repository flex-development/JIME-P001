import { createError, Logger, serialize } from '@app/subdomains/app'
import { FeathersErrorJSON } from '@feathersjs/errors'
import { ErrorTemplate, Link, Paragraph } from '@flex-development/kustomzdesign'
import { merge, pick } from 'lodash'
import { NextPage } from 'next'
import NextHead from 'next/head'
import React, { Fragment } from 'react'

/**
 * @file Custom server error page
 * @module pages/error
 * @see https://nextjs.org/docs/advanced-features/custom-error-page
 */

export type ErrorPageProps = {
  error: FeathersErrorJSON
}

/**
 * Renders a server error page.
 */
const Error: NextPage<ErrorPageProps> = ({ error }) => {
  const { code, message } = error

  return (
    <Fragment>
      <NextHead>
        <title>Server Error | Morena&#39;s Kustomz</title>
      </NextHead>
      <ErrorTemplate code={code} message={message}>
        <Paragraph c='white'>
          {/* eslint-disable-next-line prettier/prettier */}
          Go <Link c='secondary' href='/'>home</Link> and smoke or something.
        </Paragraph>
      </ErrorTemplate>
    </Fragment>
  )
}

/**
 * Retrieves the
 * @param context - Next.js page context
 * @param context.asPath - URL shown in browser, including the query
 * @param context.err - Error thrown during the rendering, if any
 * @param context.pathname - Current route; the path of the page in `/pages`
 * @param context.query - Query string section of URL parsed as an object
 * @param context.req - HTTP request object (server only)
 * @param context.res - HTTP response object (server only)
 */
Error.getInitialProps = (context): ErrorPageProps => {
  const { asPath, err, pathname, query, req } = context

  // Copy error data
  let error = { ...(err || {}) } as FeathersErrorJSON

  // Get intial error data
  let data = {
    asPath,
    pathname,
    query
  }

  // If on server, add additonal error data properties
  if (req) data = merge(data, pick(req, ['headers', 'method', 'url']))

  // Handle navigating to page using address bar
  if (!err) error = createError('Did not receive error object.', data, 500)

  // Convert to FeathersErrorJSON if not already
  if (err && !(err as FeathersErrorJSON).code) {
    const { message, stack = null, statusCode = 500 } = err
    error = createError(message, { ...data, stack, statusCode }, statusCode)
  }

  Logger.error({ 'Error.getInitialProps': error })
  return { error: serialize<ErrorPageProps['error']>(error) }
}

export default Error
