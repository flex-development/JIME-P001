import type {
  APIQuery,
  CustomerMarketingOptInLevel as MOIL,
  CustomerState
} from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import CustomerService from '../../lib/services/CustomerService'
import type { CustomerReq } from '../../lib/types'

/**
 * @file API Endpoint - Find Customers
 * @module api/customers
 */

/**
 * Returns an array of customers objects.
 *
 * This endpoint requires the use of a Shopify API token.
 *
 * If {@param req.query.userToken} is invalid, a `401  NotAuthenticated` will be
 * returned to the client.
 *
 * @async
 * @param {CustomerReq.Find} req - API request object
 * @param {APIQuery.Customer.Find} req.query - Query parameters
 * @param {boolean} [req.query.accepts_marketing] - Filter by customers who have
 * consented to receive marketing material via email
 * @param {string} [req.query.email] - Find customer by email address
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} [req.query.first_name] - Filter by first name
 * @param {number} [req.query.hitsPerPage] - Number of results per page
 * @param {number} [req.query.id] - Find customer by ID
 * @param {string} [req.query.last_name] - Filter by last name
 * @param {number} [req.query.last_order_id] - Find customer by ID of last order
 * @param {string} [req.query.last_order_name] - Filter by name of last order
 * @param {number} [req.query.length] - Result limit (used only with offset)
 * @param {number} [req.query.limit] - Number of hits to retrieve
 * @param {MOIL} [req.query.moil] - Filter by marketing opt-in level
 * @param {string} [req.query.objectID] - Find customer by ID
 * @param {number} [req.query.offset] - Offset of the first result to return
 * @param {number} [req.query.orders_count] - Filter by number of orders
 * @param {number} [req.query.page] - Specify the page to retrieve
 * @param {string} [req.query.phone] - Find customer by phone number
 * @param {CustomerState} [req.query.state] - Find by customer state
 * @param {string} [req.query.total_spent] - Filter by total spent
 * @param {string} [req.query.text] - Text to search in index
 * @param {string} req.query.userToken - Shopify API key
 * @param {string} [req.query.verified_email] - Filter by email verification
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: CustomerReq.Find, res: Res): Promise<void> => {
  res.json(await new CustomerService().find(req.query))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {CustomerReq.Find} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: CustomerReq.Find, res: Res): Promise<void> => {
  return routeWrapper<CustomerReq.Find, Res>(req, res, next)
}
