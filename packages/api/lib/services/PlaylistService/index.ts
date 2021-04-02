import type { PartialOr } from '@flex-development/json'
import type { APIQuery, OrNever, Playlist } from '@flex-development/kustomzcore'
import { request } from '@flex-development/kustomzcore/config/axios'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import AppleAuth from '../../mixins/AppleAuth'
import ShopifyAPI from '../../mixins/ShopifyAPI'

/**
 * @file Implementation - PlaylistService
 * @module lib/services/PlaylistService
 */

/**
 * Handles interactions with playlists.
 *
 * @class
 */
class PlaylistService {
  /**
   * @property {string} APPLE_MUSIC_API_PLAYLISTS_ENDPOINT - Apple Music API
   * Playlists service endpoint
   */
  static APPLE_MUSIC_API_PLAYLISTS_ENDPOINT: string =
    'https://api.music.apple.com/v1/catalog/us/playlists'

  /**
   * Returns playlist data from the Apple Music API.
   *
   * @async
   * @param {string} id - ID of playlist to request
   * @param {string} [fields] - Fields to include
   * @return {Promise<PartialOr<Playlist>>} Promise containing playlist data
   */
  static async getPlaylist(
    id: Playlist['id'],
    fields?: APIQuery.Playlist.Get['fields']
  ): OrNever<Promise<PartialOr<Playlist>>> {
    const { data = [] } = await request<AppleMusicApi.PlaylistResponse>({
      headers: {
        Authorization: `Bearer ${await AppleAuth.developerToken()}`
      },
      url: `${PlaylistService.APPLE_MUSIC_API_PLAYLISTS_ENDPOINT}/${id}`
    })

    // Get array of properties to pick from playlist
    const props = (fields || '').trim().split(',')

    // Return playlist data
    return isEmpty(fields) ? data[0] : pick(data[0], props)
  }

  /**
   * Parses the playlist ID from {@param url}.
   *
   * @param {string} url - URL of playlist to get ID from
   * @return {string} Playlist ID
   */
  static playlistId(url: string): Playlist['id'] {
    return `pl.${url.split('pl.')[1]}`
  }

  /**
   * Returns the store playlist data.
   *
   * @async
   * @param {string} [fields] - Fields to include
   * @return {Promise<Playlist>} Promise containing store playlist data
   */
  static async storePlaylist(
    fields?: APIQuery.Playlist.Get['fields']
  ): OrNever<Promise<PartialOr<Playlist>>> {
    // Get playlist URL
    const { playlist_url } = await ShopifyAPI.metafieldGlobals()

    // Get playlist ID
    const id = PlaylistService.playlistId((playlist_url.value || '') as string)

    // Return playlist data
    return await PlaylistService.getPlaylist(id, fields)
  }
}

export default PlaylistService
