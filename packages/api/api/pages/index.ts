import type { VercelResponse as Res } from '@vercel/node'
import {
  handleAPIError,
  initPathLogger,
  trackAPIEvent,
  trackAPIRequest
} from '../../lib/middleware'
import Service from '../../lib/services/PageService'
import type { FindPagesReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Find Pages
 * @module api/pages
 */

/**
 * Returns an array of page resource objects.
 *
 * @param req - API request object
 * @param req.query - Request query parameters
 * @param req.query.collection_id - Find collection by ID
 * @param req.query.fields - Specify fields to include
 * @param req.query.handle - Find collection by handle
 * @param req.query.hitsPerPage - Number of hits per page
 * @param req.query.length - Number of hits to retrieve (used only with offset)
 * @param req.query.offset - Specify the offset of the first hit to return
 * @param req.query.page - Specify the page to retrieve
 * @param req.query.text - Search query text
 * @param res - API response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  // Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  // ! Vercel interpretes this URL as '/pages' instead of the URL of a single
  // ! page with the `handle` 'index'.
  const INDEX_AS_HANDLE = req.url.includes('/pages/index')

  // If searching for page with the `handle` 'index'
  if (INDEX_AS_HANDLE) req.query.handle = 'index'

  // Convert query into search options object
  const options = Service.searchOptions(req.query)

  try {
    // Get search results
    const results = await Service.find(req.query.text, options)

    // If searching for page with the `handle` 'index', return first result
    res.json(INDEX_AS_HANDLE ? results[0] : results)
  } catch (err) {
    return handleAPIError(req, res, err, { query: req.query })
  }

  // Send success `event` hit to Google Analytics
  await trackAPIEvent(req, INDEX_AS_HANDLE ? 'pages/[handle]' : 'pages')
  return res.end()
}
