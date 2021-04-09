import type {
  APIQuery,
  APIRequestBody,
  NumberString,
  ReviewRating
} from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import ReviewService from '../../lib/services/ReviewService'
import type { ReviewReq } from '../../lib/types'

/**
 * @file API Endpoint - Create & Find Product Reviews
 * @module api/reviews
 */

export type Req = ReviewReq.Create | ReviewReq.Find

/**
 * Creates a product review or returns an array of product review objects.
 *
 * If creating a new review, the following fields are **required**:
 *
 * - `req.body.body`
 * - `req.body.email`
 * - `req.body.id`
 *
 * @async
 * @param {Req} req - API request object
 * @param {APIRequestBody.Review.POST} [req.body] - Data to create new review
 * @param {string} [req.body.body] - Review body; [1,500]
 * @param {string} [req.body.email] - Reviewer email
 * @param {NumberString} [req.body.id] - Product ID
 * @param {string} [req.body.ip_addr] - Reviewer's ip address
 * @param {ReviewRating} [req.body.rating] - Review rating; [1,5]
 * @param {string} [req.body.title] - Review title; [0,100]
 * @param {APIQuery.Review.Find} [req.query] - Query parameters
 * @param {string} [req.query.curated] - Filter by curation status
 * @param {boolean} [req.query.featured] - Filter by featured reviews
 * @param {string} [req.query.fields] - List of fields to include
 * @param {boolean} [req.query.hidden] - Filter by hidden / published reviews
 * @param {number} [req.query.hitsPerPage] - Number of results per page
 * @param {number} [req.query.id] - Find review by ID
 * @param {string} [req.query.ip_address] - Filter by review IP address
 * @param {number} [req.query.length] - Result limit (used only with offset)
 * @param {number} [req.query.limit] - Number of hits to retrieve
 * @param {string} [req.query.objectID] - Find resource by search index objectID
 * @param {number} [req.query.offset] - Offset of the first result to return
 * @param {number} [req.query.page] - Specify the page to retrieve
 * @param {number} [req.query.product_id] - Filter by product listing
 * @param {ReviewRating} [req.query.rating] - Filter by review rating
 * @param {string} [req.query.reviewer_email] - Filter by review email address
 * @param {string} [req.query.reviewer_id] - Filter by review ID
 * @param {string} [req.query.source] - Filter by review creation source
 * @param {string} [req.query.text] - Text to search in index
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async ({ body, method, query }: Req, res: Res): Promise<void> => {
  // Initialize API service
  const service = new ReviewService()

  // If sending POST request, `true`
  const POST = method.toUpperCase() === 'POST'

  // Get service method and arguments based on HTTP request method
  const args = POST ? body : query
  const smethod = POST ? 'create' : 'find'

  res.status(POST ? 201 : 200).json(await service[smethod](args))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {Req} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: Req, res: Res): Promise<void> => {
  return routeWrapper<Req, Res>(req, res, next)
}
