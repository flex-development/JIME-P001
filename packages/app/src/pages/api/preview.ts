import { database } from '@app/config/firebase'
import { createError } from '@app/subdomains/app'
import { ICMSPage } from '@app/subdomains/cms'
import { GitHubSession } from '@app/subdomains/cms/interfaces/IGitHubService'
import { PageRepository } from '@app/subdomains/cms/repositories'
import { FeathersErrorJSON } from '@feathersjs/errors'
import { isString } from 'lodash'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { getSession } from 'next-auth/client'

/**
 * @file Preview Mode Handler
 * @module pages/api/preview
 * @see https://nextjs.org/docs/advanced-features/preview-mode
 */

export default async (req: Req, res: Res): Promise<void> => {
  // Get current user session
  const session = (await getSession({ req })) as GitHubSession | null

  // Get page path query
  const { path } = req.query || {}

  // True if signed in with GitHub
  const authenticated = session?.provider === 'github'

  // True if page path query is non-empty string
  const is_valid_path = isString(path) && path?.length
  const valid_path = (is_valid_path && path) as string

  // If not signed in with GitHub, return 401 error
  if (!authenticated) {
    return res.json(createError('Not authenticated.', { session }, 401))
  }

  // If invalid path query, return 400 error
  if (!is_valid_path) {
    const data = { path: path || null }
    return res.json(createError('Invalid path query.', data, 400))
  }

  // Initialize Page repository
  const Pages = new PageRepository(database)

  // Get page data by path
  const page: ICMSPage | null = await Pages.findByPath(valid_path[1])
  let preview: FeathersErrorJSON | ICMSPage = {} as ICMSPage

  if (!page) {
    preview = createError(`Page with path "${path}" not found`, { path }, 404)
  } else {
    preview = page
  }

  /**
   * Unable to use `res.setPreviewData(preview)` because it causes the following
   * error: `Preview data is limited to 2KB currently, reduce how much data
   * you are storing as preview data to continue`.
   */
  // res.setPreviewData(preview)
  return res.json(preview)
}
