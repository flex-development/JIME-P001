import { database } from '@app/config/firebase'
import { createError } from '@subdomains/app'
import { ICMSPage } from '@subdomains/cms'
import { PageRepository } from '@subdomains/cms/repositories'
import { ProviderSessionGitHub } from '@subdomains/cms/services'
import { isString, pick } from 'lodash'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { getSession } from 'next-auth/client'

/**
 * @file Preview Mode Handler
 * @module pages/api/preview
 * @see https://nextjs.org/docs/advanced-features/preview-mode
 */

export default async (req: Req, res: Res): Promise<void> => {
  // Get current user session
  const session = (await getSession({ req })) as ProviderSessionGitHub | null

  // Get page path query
  const { path } = req.query || {}

  // True if signed in with GitHub
  const authenticated = session?.provider === 'github'

  // True if page path query is non-empty string
  const is_valid_path = isString(path) && path?.length
  const valid_path = (is_valid_path && path) as string

  // If not signed in with GitHub, return 401 error
  if (!authenticated) {
    const error = createError('Not authenticated.', { session }, 401)
    return res.status(error.code).json(error)
  }

  // If invalid path query, return 400 error
  if (!is_valid_path) {
    const data = { path: path || null }
    const error = createError('Invalid path query.', data, 400)

    return res.status(error.code).json(error)
  }

  // Initialize Page repository
  const Pages = new PageRepository(database)

  // Get page data by path
  const page: ICMSPage | null = await Pages.findByPath(valid_path)

  if (!page) {
    const data = { path: valid_path }
    const error = createError(`Page with path "${path}" not found`, data, 404)

    return res.status(error.code).json(error)
  }

  /**
   * Unable to use `res.setPreviewData(page)` because it causes the following
   * error: `Preview data is limited to 2KB currently, reduce how much data
   * you are storing as preview data to continue`.
   */
  res.setPreviewData(pick(page, ['id', 'path', 'uuid']))
  res.writeHead(307, { Location: page.path })
  res.end()
}
