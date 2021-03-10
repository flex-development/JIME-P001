import type { GetPlaylistQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import Service from '../services/PlaylistService'
import type { GetPlaylistReq as Req } from '../types'

/**
 * @file Implementation - PlaylistController
 * @module lib/controllers/PlaylistController
 */

/**
 * Handles all API requests to the `/playlist/*` endpoints.
 *
 * @class
 */
class PlaylistController {
  /**
   * Fetches the store playlist data.
   *
   * @async
   * @param {Req} req - API request object
   * @param {GetPlaylistQuery} [req.query] - Query parameters object
   * @param {string} [req.query.fields] - Fields to include
   * @param {Res} res - Server response object
   * @return {Promise<Res | void>} Promise containing server response object if
   * an error is thrown, or empty promise if request completed successfully
   */
  static async getPlaylistData(req: Req, res: Res): Promise<void> {
    res.json(await Service.storePlaylistData(req.query.fields))
  }
}

export default PlaylistController
