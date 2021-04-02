import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../lib/middleware/routeWrapper'
import PlaylistService from '../lib/services/PlaylistService'
import type { PlaylistReq } from '../lib/types'

/**
 * @file API Endpoint - Get Store Playlist Data
 * @module api/playlist
 */

/**
 * Fetches the store playlist data.
 *
 * @async
 * @param {PlaylistReq.Get} req - API request object
 * @param {APIQuery.Playlist.Get} [req.query] - Query parameters
 * @param {string} [req.query.fields] - Fields to include
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: PlaylistReq.Get, res: Res): Promise<void> => {
  res.json(await PlaylistService.storePlaylist(req.query.fields))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {PlaylistReq.Get} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: PlaylistReq.Get, res: Res): Promise<void> => {
  return routeWrapper<PlaylistReq.Get, Res>(req, res, next)
}
