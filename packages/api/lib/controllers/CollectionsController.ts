import CollectionService from '../services/CollectionService'
import type {
  FindCollectionsReq as FindReq,
  GetCollectionReq as GetReq
} from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - CollectionService
 * @module lib/controllers/CollectionsController
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
