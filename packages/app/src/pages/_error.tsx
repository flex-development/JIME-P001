import { ErrorTemplate } from '@components/templates/ErrorTemplate'
import { serialize } from '@flex-development/json/utils/serialize'
import createError from '@flex-development/kustomzcore/utils/createError'
import { ErrorContent } from '@subdomains/app/components/ErrorContent'
import { SEO } from '@subdomains/app/components/SEO'
import type { IPagePropsError as PageProps } from '@subdomains/app/types'
import getLayoutData from '@subdomains/app/utils/getLayoutData'
import debug from 'debug'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import type { NextPage } from 'next'
import { Fragment } from 'react'

/**
 * @file Page - Server Error
 * @module pages/error
 */

/**
 * Renders a server error page.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-error-page
 *
 * @param props - Page component props
 * @param props.error - Error object
 * @param props.layout - Data to populate `Layout` component
 */
const ServerError: NextPage<PageProps> = ({ error }) => (
  <Fragment>
    <SEO title='Server Error' />
    <ErrorTemplate code={error.code} message={error.message}>
      <ErrorContent />
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
ServerError.getInitialProps = async (context): Promise<PageProps> => {
  const { asPath, err, pathname, query, req } = context

  // Copy error data
  let error = { ...(err || {}) } as PageProps['error']

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
  if (err && !(err as PageProps['error']).code) {
    const { message, stack = null, statusCode = 500 } = err
    error = createError(message, { ...data, stack, statusCode }, statusCode)
  }

  // Get layout data
  const layout = await getLayoutData()

  debug('pages/_error')({ getInitialProps: error })
  return {
    error: serialize<PageProps['error']>(error),
    layout,
    ua: context.req?.headers['user-agent']
  }
}

export default ServerError
