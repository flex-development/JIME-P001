import type { PartialOr } from '@flex-development/json'
import type {
  GetPlaylistQuery,
  OrNever,
  Playlist
} from '@flex-development/kustomzcore'
import { request } from '@flex-development/kustomzcore/config/axios'
import type { AxiosRequestConfig } from 'axios'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import AppleAuth from './AppleAuthService'
import Metafields from './MetafieldService'

/**
 * @file Implementation - PlaylistService
 * @module services/PlaylistService
 */

/**
 * Handles interactions with playlists.
 *
 * @class
 */
class PlaylistService {
  /**
   * Returns playlist data from the Apple Music API.
   *
   * @async
   * @param {string} id - ID of playlist to request
   * @return {Promise<Playlist>} Promise containing playlist data
   * @throws {FeathersErrorJSON}
   */
  static async getPlaylist(id: Playlist['id']): OrNever<Promise<Playlist>> {
    const config = await PlaylistService.getRequestConfig(id)
    const { data = [] } = await request<AppleMusicApi.PlaylistResponse>(config)

    return data[0]
  }

  /**
   * Returns the configuration object needed to request playlist data from the
   * Apple Music API.
   *
   * @async
   * @param {string} id - ID of playlist to request
   * @return {Promise<AxiosRequestConfig>} Axios request config
   * @throws {FeathersErrorJSON}
   */
  static async getRequestConfig(
    id: Playlist['id']
  ): OrNever<Promise<AxiosRequestConfig>> {
    return {
      headers: {
        Authorization: `Bearer ${await AppleAuth.developerToken()}`
      },
      url: `https://api.music.apple.com/v1/catalog/us/playlists/${id}`
    }
  }

  /**
   * Parses the playlist ID from {@param url}.
   *
   * @param {string} url - URL of playlist to get ID from
   * @return {string} Playlist ID
   */
  static playlistID(url: string): Playlist['id'] {
    return `pl.${url.split('pl.')[1]}`
  }

  /**
   * Returns the store playlist data.
   *
   * @async
   * @param {string} [fields] - Fields to include
   * @return {Promise<Playlist>} Promise containing store playlist data
   * @throws {FeathersErrorJSON}
   */
  static async storePlaylistData(
    fields?: GetPlaylistQuery['fields']
  ): OrNever<Promise<PartialOr<Playlist>>> {
    // Get playlist URL
    const url = await PlaylistService.storePlaylistURL()

    // Get playlist ID
    const id = PlaylistService.playlistID(url)

    // Get playlist data
    const playlist = await PlaylistService.getPlaylist(id)

    // Get array of properties to pick from playlist
    const props = (fields || '').trim().split(',')

    // Return playlist data
    return isEmpty(fields) ? playlist : pick(playlist, props)
  }

  /**
   * Returns the URL of the store playlist.
   *
   * @async
   * @return {Promise<string>} Store playlist URL
   * @throws {FeathersErrorJSON}
   */
  static async storePlaylistURL(): OrNever<Promise<string>> {
    const { playlist_url } = await Metafields.globals()
    return (playlist_url.value || '') as string
  }
}

export default PlaylistService
