import PolicyService from '../services/PolicyService'
import type {
  FindPoliciesReq as FindReq,
  GetPolicyReq as GetReq
} from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - PolicyService
 * @module lib/controllers/PoliciesController
 */

class PoliciesController extends SearchIndexController<FindReq | GetReq> {
  /**
   * Initializes a new `PoliciesController` instance.
   */
  constructor() {
    super(new PolicyService())
  }
}

export default PoliciesController
