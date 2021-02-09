import { axios } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import type { AxiosRequestConfig } from 'axios'
import pick from 'lodash/pick'
import {
  handleAPIError,
  initPathLogger,
  trackAPIEvent,
  trackAPIRequest
} from '../lib/middleware'
import type { APIRequest as Req } from '../lib/types'
import { appleDeveloperToken, metafieldsGlobal } from '../lib/utils'

/**
 * @file API Endpoint - Get Store Playlist Data
 * @module api/playlist
 */

export default async (req: Req, res: Res): Promise<Res | void> => {
  // Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  try {
    // Fetch global metafields to get playlist URL
    const { playlist_url } = await metafieldsGlobal()
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

    res.json({
      attributes: pick(attributes, ['name', 'url']),
      id,
      tracks: relationships?.tracks?.data.map(track => track.attributes)
    })
  } catch (err) {
    return handleAPIError(req, res, err)
  }

  // Send success `event` hit to Google Analytics
  await trackAPIEvent(req, '/playlist')
  return res.end()
}
