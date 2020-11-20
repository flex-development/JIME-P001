import { GitHubSession } from '@app/subdomains/cms/interfaces/IGitHubService'
import { isString, merge } from 'lodash'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { getSession } from 'next-auth/client'

/**
 * @file CMS Login Handler
 * @module pages/api/admin
 */

export default async (req: Req, res: Res): Promise<void> => {
  // Get current user session
  const session = (await getSession({ req })) as GitHubSession | null

  // Get page path query
  const { path } = req.query || {}

  // Validate path query
  const valid_path = isString(path) && path?.length ? path : '/'

  // True if signed in with GitHub
  const authenticated = session?.provider === 'github'

  // Get redirect location
  const location = authenticated ? valid_path : '/api/auth/signin/github'

  // Redirect to homepage, URL indicated by path query, or GitHub login page
  res.writeHead(307, merge({}, req.headers, { Location: location }))
  res.end()
}
