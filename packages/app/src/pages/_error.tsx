import { ErrorContent } from '@app/components/ErrorContent'
import { SEO } from '@app/components/SEO'
import type { IPagePropsError as PageProps, NextError } from '@app/types'
import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject } from '@flex-development/json'
import { serialize } from '@flex-development/json/utils/serialize'
import ga from '@kustomzcore/config/google-analytics'
import log from '@kustomzcore/config/logger'
import vercel from '@kustomzcore/config/vercel-env'
import createError from '@kustomzcore/utils/createError'
import {
  ErrorTemplate,
  ErrorTemplateProps
} from '@kustomzdesign/lib/templates/ErrorTemplate'
import type { IncomingMessage } from 'http'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import type { NextPage, NextPageContext as Context } from 'next'
import type { ReactElement } from 'react'
import { useEffect } from 'react'

/**
 * @file Page - Server Error
 * @module pages/error
 */

/**
 * Renders the server error page.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-error-page
 *
 * @param {PageProps} props - Page component props
 * @param {FeathersErrorJSON} props.error - `FeathersErrorJSON` error object
 * @return {ReactElement<ErrorTemplateProps>} 404 page
 */
const ServerError: NextPage<PageProps> = (
  props: PageProps
): ReactElement<AnyObject> => {
  const { error } = props

  useEffect(() => console.error({ ServerError: error }))

  return (
    <>
      <SEO title='Server Error' />
      <ErrorTemplate code={error.code} message={error.message}>
        <ErrorContent />
      </ErrorTemplate>
    </>
  )
}

/**
 * Sanitizes {@param ctx.err} before being displayed on the `Error` page.
 *
 * @param {Context} ctx - Next.js page context
 * @param {string} [ctx.asPath] - URL shown in browser, including the query
 * @param {NextError} [ctx.err] - Error thrown, if any
 * @param {string} ctx.pathname - Path of the page in `/pages`
 * @param {AnyObject} ctx.query - Query segment of URL as an object
 * @param {IncomingMessage} [ctx.req] - `HTTP` request object (server only)
 * @return {Promise<PageProps>} Promise containig `ServerError` page props
 */
ServerError.getInitialProps = async (ctx: Context): Promise<PageProps> => {
  const { asPath, err, pathname, query, req } = ctx

  // Get error data
  const data = merge(pick(req, ['headers', 'method', 'url']), {
    asPath,
    pathname,
    query
  })

  // Convert into `FeathersErrorJSON` error object
  const error = createError(err || 'Unknown error.', data, err?.statusCode)

  // Report and log error if defined
  if (err) {
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
  }

  return { error: serialize<PageProps['error']>(error) }
}

export default ServerError
