import { ProviderSessionGitHub } from '@subdomains/cms/services'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { getSession } from 'next-auth/client'

/**
 * @file CMS Preview Route Handler
 * @module pages/api/preview
 * @see https://nextjs.org/docs/advanced-features/preview-mode
 */

export default async (req: Req, res: Res): Promise<void> => {
  // Get current user session
  const session = (await getSession({ req })) as ProviderSessionGitHub | null

  // If not signed-in with GitHub, don't enable preview mode
  if (session?.provider !== 'github') {
    return res.status(401).json({ preview: false, session })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Return object with user session data
  res.json({ preview: true, session })
}
