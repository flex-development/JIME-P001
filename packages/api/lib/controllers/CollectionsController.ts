import Service from '../services/CollectionService'
import type {
  FindCollectionsReq as FindReq,
  GetCollectionReq as GetReq
} from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - CollectionService
 * @module lib/controllers/CollectionsController
 */

/**
 * Handles all API requests to the `/collections/*` endpoints.
 *
 * @class
 * @extends SearchIndexController
 */
class CollectionsController extends SearchIndexController<FindReq | GetReq> {
  /**
   * Initializes a new `CollectionsController` instance.
   */
  constructor() {
    super(new Service())
  }
}

export default CollectionsController
