import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import ReviewService from '../../lib/services/ReviewService'
import type { ReviewReq } from '../../lib/types'

/**
 * @file API Endpoint - Get Review By ID
 * @module api/reviews/[objectID]
 */

/**
 * Retrieve a product review by ID.
 *
 * @async
 * @param {ReviewReq.Get} req - API request object
 * @param {APIQuery.Review.Get} req.query - Query parameters
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - ID of product review to retrieve
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: ReviewReq.Get, res: Res): Promise<void> => {
  res.json(await new ReviewService().findOne(req.query))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {ReviewReq.Get} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: ReviewReq.Get, res: Res): Promise<void> => {
  return routeWrapper<ReviewReq.Get, Res>(req, res, next)
}
