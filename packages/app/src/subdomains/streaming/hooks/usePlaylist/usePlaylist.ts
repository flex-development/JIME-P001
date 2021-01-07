import {
  Logger,
  MusicKitMediaItem,
  MusicKitSongAttributes
} from '@flex-development/kustomzcore'
import { isEmpty } from 'lodash'
import { useMemoCompare } from 'packages/system/dist'
import { useEffect, useMemo } from 'react'
import { useSetState } from 'react-hanger/array/useSetState'
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
  loading: boolean
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
  const id = useMemo(() => `pl.${url?.split('pl.')[1]}`, [url])

  // Store playlist object
  const [playlist, setPlaylist] = useSetState<MusicKit.Resource>({})
  const $playlist = useMemoCompare<typeof playlist>(playlist)

  useEffect(() => {
    // If no playlist, or playlists are the same, do nothing
    if (isEmpty(id) || isEmpty(kit) || $playlist.id === id) {
      return
    } /* eslint-disable prettier/prettier */
    ;(async () => {
      try {
        setPlaylist(await kit.api.playlist(id))
      } catch (error) {
        Logger.error({ usePlaylist: error })
        throw error
      }
    })()
  }, [$playlist, id, kit, setPlaylist])

  // Get array of song attributes
  const songs = useMemo<MusicKitSongAttributes[]>(() => {
    if (!$playlist || isEmpty($playlist)) return []

    const { data: _songs = [] } = $playlist?.relationships?.tracks ?? {}
    return _songs.map((song: MusicKitMediaItem) => song.attributes)
  }, [$playlist])

  return { id, loading: !!id.length && !songs.length, songs }
}
