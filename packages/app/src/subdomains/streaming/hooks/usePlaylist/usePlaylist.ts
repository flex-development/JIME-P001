import {
  MusicKitMediaItem,
  MusicKitSongAttributes
} from '@flex-development/kustomzcore/types/musickit'
import { useMemoCompare } from '@hooks/useMemoCompare'
import { useMusicKit } from '@subdomains/streaming/hooks/useMusicKit'
import debug from 'debug'
import { useEffect, useMemo } from 'react'
import { useSetState } from 'react-hanger/array/useSetState'

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
    if (!id.length || !Object.keys(kit).length || $playlist.id === id) {
      return
    } /* eslint-disable prettier/prettier */
    ;(async () => {
      try {
        setPlaylist(await kit.api.playlist(id))
      } catch (error) {
        debug('subdomains/streaming/hooks/usePlaylist')(error)
        throw error
      }
    })()
  }, [$playlist, id, kit, setPlaylist])

  // Get array of song attributes
  const songs = useMemo<MusicKitSongAttributes[]>(() => {
    if (!$playlist || !Object.keys($playlist).length) return []

    const { data: _songs = [] } = $playlist?.relationships?.tracks ?? {}
    return _songs.map((song: MusicKitMediaItem) => song.attributes)
  }, [$playlist])

  return { id, loading: !(id.length && songs.length), songs }
}
