import {
  MusicKitMediaItem,
  MusicKitSongAttributes
} from '@flex-development/kustomzcore'
import { isEmpty } from 'lodash'
import { useCallback, useMemo } from 'react'
import useSWR from 'swr'
import { useMusicKit } from '../useMusicKit'

/**
 * @file Get array of song attributes for an Apple Music playlist
 * @module subdomains/streaming/hooks/usePlaylist/impl
 */

/**
 * `usePlaylist` return type.
 */
export type UsePlaylist = {
  id: string
  songs: MusicKitSongAttributes[]
}

/**
 * Returns an array of song attributes.
 *
 * @param url - URL of playlist
 */
export const usePlaylist = (url = ''): UsePlaylist => {
  // Get MusicKit instance
  const kit = useMusicKit()

  // Get playlist ID
  const p_id = useMemo(() => `pl.${url?.split('pl.')[1]}`, [url])

  /**
   * Fetches a playlist from the Apple Music API.
   *
   * @param async
   * @param id - ID of playlist to fetch
   */
  const fetchPlaylist = async (id: string): Promise<MusicKit.Resource> => {
    if (isEmpty(id) || isEmpty(kit)) return {}
    return await kit.api.playlist(id)
  }

  /* Callback version of `fetchPlaylist` */
  const fetchPlaylistCB = useCallback(fetchPlaylist, [kit])

  // Handle SWR data state
  const { data: playlist } = useSWR([p_id], fetchPlaylistCB)

  // Get array of song attributes
  const songs = useMemo<MusicKitSongAttributes[]>(() => {
    if (!playlist) return []

    const { data: _songs = [] } = playlist?.relationships?.tracks ?? {}
    return _songs.map((song: MusicKitMediaItem) => song.attributes)
  }, [playlist])

  return { id: p_id, songs }
}
