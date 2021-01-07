import { IPagePropsError as PageProps } from '@app/subdomains/app/interfaces'
import { getGlobalMetafields } from '@app/subdomains/metafields/utils'
import { FeathersErrorJSON } from '@feathersjs/errors'
import { serialize } from '@flex-development/json'
import { createError, Logger } from '@flex-development/kustomzcore'
import { ErrorTemplate, Link, Paragraph } from '@flex-development/kustomzdesign'
import { merge, pick } from 'lodash'
import { NextPage } from 'next'
import NextHead from 'next/head'
import { Fragment } from 'react'

/**
 * @file Page - Server Error
 * @module pages/error
 * @see https://nextjs.org/docs/advanced-features/custom-error-page
 */

/**
 * Renders a server error page.
 */
const Error: NextPage<PageProps> = ({ error }) => (
  <Fragment>
    <NextHead>
      <title>Server Error | Morena&#39;s Kustomz</title>
    </NextHead>
    <ErrorTemplate code={error.code} message={error.message}>
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
 * Sanitizes {@param context.err} before being displayed on the `Error` page.
 *
 * @param context - Next.js page context
 * @param context.asPath - URL shown in browser, including the query
 * @param context.err - Error thrown during the rendering, if any
 * @param context.pathname - Current route; the path of the page in `/pages`
 * @param context.query - Query string section of URL parsed as an object
 * @param context.req - HTTP request object (server only)
 * @param context.res - HTTP response object (server only)
 */
Error.getInitialProps = async (context): Promise<PageProps> => {
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

  // Get global metafields
  const globals = await getGlobalMetafields()

  Logger.error({ 'Error.getInitialProps': error })
  return { error: serialize<PageProps['error']>(error), globals }
}

export default Error
