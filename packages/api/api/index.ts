import { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * @file API Handler
 * @module api
 */

export default (req: VercelRequest, res: VercelResponse): VercelResponse => {
  const { body, cookies, query } = req
  return res.json({ message: 'Hello, World!', req: { body, cookies, query } })
}
