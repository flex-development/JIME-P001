import Service from '../services/MenuService'
import type { FindMenusReq as FindReq, GetMenuReq as GetReq } from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - MenuService
 * @module lib/controllers/MenusController
 */

/**
 * Handles all API requests to the `menus/*` endpoints.
 *
 * @class
 * @extends SearchIndexController
 */
class MenusController extends SearchIndexController<FindReq | GetReq> {
  /**
   * Initializes a new `MenusController` instance.
   */
  constructor() {
    super(new Service())
  }
}

export default MenusController
