import { axios } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import type { AxiosRequestConfig } from 'axios'
import pick from 'lodash/pick'
import routeWrapper from '../lib/middleware/routeWrapper'
import type { APIRequest as Req } from '../lib/types'
import { appleDeveloperToken, metafieldsGlobal } from '../lib/utils'

/**
 * @file API Endpoint - Get Store Playlist Data
 * @module api/playlist
 */

export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req: Req, res: Res) => {
    // Fetch global metafields to get playlist URL
    const { playlist_url } = await metafieldsGlobal()
    const url = (playlist_url.value || '') as string

    // Get playlist ID
    const id = `pl.${url?.split('pl.')[1]}`

    // Build request config
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await appleDeveloperToken()}`
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
  })
}
