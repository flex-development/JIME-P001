import Service from '../services/PolicyService'
import type {
  FindPoliciesReq as FindReq,
  GetPolicyReq as GetReq
} from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - PolicyService
 * @module lib/controllers/PoliciesController
 */

/**
 * Handles all API requests to the `policies/*` endpoints.
 *
 * @class
 * @extends SearchIndexController
 */
class PoliciesController extends SearchIndexController<FindReq | GetReq> {
  /**
   * Initializes a new `PoliciesController` instance.
   */
  constructor() {
    super(new Service())
  }
}

export default PoliciesController
