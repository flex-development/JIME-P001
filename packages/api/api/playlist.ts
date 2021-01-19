import { createError } from '@flex-development/kustomzcore'
import type { VercelRequest as Req, VercelResponse as Res } from '@vercel/node'
import type { Song } from '@yujinakayama/apple-music/dist/serverTypes/song'
import debug from 'debug'
import pick from 'lodash/pick'
import { APPLE_MUSIC } from '../lib/config'
import { globalMetafields } from '../lib/utils'

/**
 * @file API Endpoint - Get Store Playlist Data
 * @module api/playlist
 */

export default async (req: Req, res: Res): Promise<Res> => {
  try {
    // Fetch global metafields to get playlist URL
    const { playlist_url } = await globalMetafields()
    const url = (playlist_url.value || '') as string

    // Get playlist ID
    const id = `pl.${url?.split('pl.')[1]}`

    // Get playlist data
    const { data } = await APPLE_MUSIC.playlists.get(id)
    const { attributes, relationships } = data[0]

    // Convert to array and cast as array of songs
    const tracks = [relationships?.tracks?.data].flat() as Song[]

    return res.json({
      attributes: pick(attributes, ['name', 'url']),
      id,
      tracks: tracks.map(track => track.attributes)
    })
  } catch (err) {
    const error = err.code ? err : createError(err)

    debug('api/playlist')(error)
    return res.status(error.code).json(error)
  }
}
