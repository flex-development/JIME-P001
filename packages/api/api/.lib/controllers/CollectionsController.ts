import CollectionService from '../services/CollectionService'
import type {
  FindCollectionsReq as FindReq,
  GetCollectionReq as GetReq
} from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - CollectionService
 * @module api/lib/controllers/CollectionsController
 */

/**
 * Handles all API requests to the `/collections/*` endpoints and interactions
 * with the {@link CollectionService}.
 *
 * @class
 * @extends SearchIndexController
 */
class CollectionsController extends SearchIndexController<FindReq | GetReq> {
  /**
   * Initializes a new `CollectionsController` instance.
   */
  constructor() {
    super(new CollectionService())
  }
}

export default CollectionsController
