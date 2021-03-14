import type { AnyObject } from '@flex-development/json'
import type { OrNever } from '@flex-development/kustomzcore'
import type { VercelResponse as VRes } from '@vercel/node'
import Service from '../services/SearchIndexService'
import type { APIRequest as AReq } from '../types'

/**
 * @file Implementation - Controller - SearchIndexService
 * @module lib/controllers/SearchIndexController
 */

/**
 * Handles requests to API services that extend the `SearchIndexService` class.
 *
 * @template Req - API request object
 * @template Res - Server response object
 *
 * @class
 */
class SearchIndexController<Req extends AReq = AReq, Res extends VRes = VRes> {
  /**
   * @protected
   * @property {Service} service - Search index controller service
   */
  protected service: Service

  /**
   * Initializes a new SearchIndexController instance.
   *
   * @param {Service} service - Service controller interacts with
   */
  constructor(service: Service) {
    this.service = service
  }

  /**
   * Performs a search.
   *
   * @async
   * @param {Req} req - API request object
   * @param {AnyObject} [req.query] - Query parameters object
   * @param {string} [req.query.fields] - List of fields to include
   * @param {number} [req.query.hitsPerPage] - Number of results per page
   * @param {number} [req.query.length] - Result limit (used only with offset)
   * @param {string} [req.query.objectID] - Find resource by index object ID
   * @param {number} [req.query.offset] - Offset of the first result to return
   * @param {number} [req.query.page] - Specify the page to retrieve
   * @param {string} [req.query.text] - Text to search in index
   * @param {Res} res - Server response object
   * @return {Promise<void>} Empty promise if request completed successfully
   */
  async find(req: Req, res: Res): OrNever<Promise<void>> {
    // Convert query into search options object
    const options = this.service.searchOptions(req.query)

    // Execute search
    res.json(await this.service.search(req.query.text, options))
  }

  /**
   * Retrieve a single resource from the current service's search index.
   *
   * @async
   * @param {Req} req - API request object
   * @param {AnyObject} req.query - Query parameters object
   * @param {string} [req.query.fields] - List of fields to include
   * @param {string} req.query.objectID - ID of resource to retrieve
   * @param {Res} res - Server response object
   * @return {Promise<void>} Empty promise if request completed successfully
   */
  async findOne(req: Req, res: Res): OrNever<Promise<void>> {
    res.json(await this.service.get(req.query.objectID, req.query.fields))
  }
}

export default SearchIndexController
