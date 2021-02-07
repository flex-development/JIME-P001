import { axios } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import { AxiosRequestConfig } from 'axios'
import pick from 'lodash/pick'
import { initPathLogger } from '../lib/middleware'
import type { APIRequest as Req } from '../lib/types'
import {
  appleDeveloperToken,
  formatError,
  globalMetafields
} from '../lib/utils'

/**
 * @file API Endpoint - Get Store Playlist Data
 * @module api/playlist
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  try {
    // Fetch global metafields to get playlist URL
    const { playlist_url } = await globalMetafields()
    const url = (playlist_url.value || '') as string

    // Get playlist ID
    const id = `pl.${url?.split('pl.')[1]}`

    // Build request config
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${appleDeveloperToken()}`
      },
      url: `https://api.music.apple.com/v1/catalog/us/playlists/${id}`
    }

    // Get playlist data
    const { data = [] } = await axios<AppleMusicApi.PlaylistResponse>(config)
    const { attributes, relationships } = data[0]

    return res.json({
      attributes: pick(attributes, ['name', 'url']),
      id,
      tracks: relationships?.tracks?.data.map(track => track.attributes)
    })
  } catch (err) {
    const error = formatError(err)

    req.logger.error({ error })
    return res.status(error.code).json(error)
  }
}
