import type { GetPlaylistQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import PlaylistController from '../lib/controllers/PlaylistController'
import routeWrapper from '../lib/middleware/routeWrapper'
import type { GetPlaylistReq as Req } from '../lib/types'

/**
 * @file API Endpoint - Get Store Playlist Data
 * @module api/playlist
 */

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
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req, res) => {
    return PlaylistController.getPlaylistData(req, res)
  })
}
