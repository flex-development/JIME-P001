import { ErrorContent } from '@app/components/ErrorContent'
import { SEO } from '@app/components/SEO'
import ga from '@app/config/google-analytics'
import log from '@app/config/logger'
import vercel from '@app/config/vercel-env'
import type { IPagePropsError as PageProps } from '@app/types'
import { serialize } from '@flex-development/json/utils/serialize'
import createError from '@kustomzcore/utils/createError'
import { ErrorTemplate } from '@kustomzdesign/lib/templates/ErrorTemplate'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import type { NextPage } from 'next'
import { Fragment, useEffect } from 'react'

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
 * @param props.error - `FeathersErrorJSON` error object
 */
const ServerError: NextPage<PageProps> = ({ error }) => {
  useEffect(() => console.error({ ServerError: error }))

  return (
    <Fragment>
      <SEO title='Server Error' />
      <ErrorTemplate code={error.code} message={error.message}>
        <ErrorContent />
      </ErrorTemplate>
    </Fragment>
  )
}

/**
 * Sanitizes {@param context.err} before being displayed on the `Error` page.
 *
 * @param context - Next.js page context
 * @param context.asPath - URL shown in browser, including the query
 * @param context.err - Error thrown during the rendering, if any
 * @param context.pathname - Current route; the path of the page in `/pages`
 * @param context.query - Query string section of URL parsed as an object
 * @param context.req - `HTTP` request object (server only)
 * @param context.res - HTTP response object (server only)
 */
ServerError.getInitialProps = async (context): Promise<PageProps> => {
  const { asPath, err, pathname, query, req } = context
  const $err = err ? 'Unknown error.' : (err as NonNullable<typeof err>)

  // Get error data
  const data = merge(pick(req, ['headers', 'method', 'url']), {
    asPath,
    pathname,
    query
  })

  // Convert into `FeathersErrorJSON` error object
  const error = createError($err, data, err?.statusCode)

  // Send error `event` hit to Google Analytics
  await ga.event({
    ...vercel,
    error: JSON.stringify(error),
    eventAction: error.name,
    eventCategory: pathname,
    eventLabel: error.message,
    eventValue: error.code,
    ua: error.data.headers['user-agent'],
    url: error.data.url
  })

  // Log final error
  log('pages/_error').error({ getInitialProps: error })

  return { error: serialize<PageProps['error']>(error) }
}

export default ServerError
