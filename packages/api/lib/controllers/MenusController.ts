import MenuService from '../services/MenuService'
import type { FindMenusReq as FindReq, GetMenuReq as GetReq } from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - MenuService
 * @module lib/controllers/MenusController
 */

/**
 * Handles all API requests to the `menus/*` endpoints and interactions with the
 * {@link MenuService}.
 *
 * @class
 * @extends SearchIndexController
 */
class MenusController extends SearchIndexController<FindReq | GetReq> {
  /**
   * Initializes a new `MenusController` instance.
   */
  constructor() {
    super(new MenuService())
  }
}

export default MenusController
