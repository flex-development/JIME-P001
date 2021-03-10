import type {
  FindPagesQuery as FindQuery,
  IPage,
  OrNever
} from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import Service from '../services/PageService'
import SEO from '../services/SEOService'
import type { FindPagesReq as FindReq, GetPageReq as GetReq } from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - PageService
 * @module lib/controllers/PagesController
 */

/**
 * Handles all API requests to the `/pages/*` endpoints and interactions with
 * the {@link PageService}.
 *
 * @class
 * @extends SearchIndexController
 */
class PagesController extends SearchIndexController<FindReq | GetReq> {
  /**
   * Initializes a new `PagesController` instance.
   */
  constructor() {
    super(new Service())
  }

  /**
   * Performs a search.
   *
   * @async
   * @param {FindReq} req - API request object
   * @param {FindQuery} [req.query] - Query parameters object
   * @param {string} [req.query.author] - Filter pages by author
   * @param {string} [req.query.fields] - List of fields to include
   * @param {number} [req.query.hitsPerPage] - Number of results per page
   * @param {number} [req.query.id] - Find page by ID
   * @param {number} [req.query.length] - Result limit (used only with offset)
   * @param {string} [req.query.objectID] - Find resource by index object ID
   * @param {number} [req.query.offset] - Offset of the first result to return
   * @param {number} [req.query.page] - Specify the page to retrieve
   * @param {string} [req.query.text] - Text to search in index
   * @param {Res} res - Server response object
   * @return {Promise<void>} Empty promise if request completed successfully
   */
  async find(req: FindReq, res: Res): OrNever<Promise<void>> {
    // ! Interpreted as URL '/pages' instead of '/pages/[objectID]'
    if (req.url.includes('/pages/index')) req.query.objectID = 'index'

    // Convert query into search options object
    const options = this.service.searchOptions(req.query)

    // Get search results
    const results = await this.service.search(req.query.text, options)

    // If searching for page with the `objectID` 'index', return first result
    const data = req.query.objectID ? results[0] : results

    // Get SEO data for single page resouce if requested
    if (req.query.objectID && SEO.includeSEO(req.query.fields)) {
      data.seo = await SEO.page(data as IPage)
    }

    res.json(data)
  }
}

export default PagesController
