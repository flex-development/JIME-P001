import type { OrNever } from '@flex-development/kustomzcore'
import type { VercelResponse as VRes } from '@vercel/node'
import type SearchIndexService from '../services/SearchIndexService'
import type { APIRequest as AReq } from '../types'

/**
 * @file Implementation - SearchIndexController
 * @module lib/controllers/SearchIndexController
 */

/**
 * Handles requests to API services that extend the `SearchIndexService` class.
 */
class SearchIndexController {
  /**
   * Performs a search.
   *
   * @async
   * @param {Req} req - API request object
   * @param {Req['query']} req.query - Query parameters object
   * @param {string} [req.query.fields] - List of fields to include
   * @param {number} [req.query.hitsPerPage] - Number of results per page
   * @param {number} [req.query.length] - Result limit (used only with offset)
   * @param {string} [req.query.objectID] - Find resource by index object ID
   * @param {number} [req.query.offset] - Offset of the first result to return
   * @param {number} [req.query.page] - Specify the page to retrieve
   * @param {string} [req.query.text] - Text to search in index
   * @param {Res} res - API response object
   * @param {SearchIndexService} service - Service controller interacts with
   * @return {Promise<void>} Empty promise if request completed successfully
   */
  static async find<Req extends AReq = AReq, Res extends VRes = VRes>(
    req: Req,
    res: Res,
    service: SearchIndexService
  ): OrNever<Promise<void>> {
    // Convert query into search options object
    const options = service.searchOptions(req.query)

    // Execute search
    res.json(await service.search(req.query.text, options))
  }

  /**
   * Retrieve a single resource from the current service's search index.
   *
   * @async
   * @param {Req} req - API request object
   * @param {Req['query']} req.query - Query parameters object
   * @param {string} [req.query.fields] - List of fields to include
   * @param {string} [req.query.objectID] - ID of resource to retrieve
   * @param {Res} res - API response object
   * @param {SearchIndexService} service - Service controller interacts with
   * @return {Promise<void>} Empty promise if request completed successfully
   */
  static async findOne<Req extends AReq = AReq, Res extends VRes = VRes>(
    req: Req,
    res: Res,
    service: SearchIndexService
  ): OrNever<Promise<void>> {
    res.json(await service.get(req.query.objectID, req.query.fields))
  }
}

export default SearchIndexController
