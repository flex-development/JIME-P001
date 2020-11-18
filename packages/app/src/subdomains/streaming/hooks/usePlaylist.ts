import {
  AnyObject,
  MusicKitInstance,
  MusicKitMediaItem,
  MusicKitQueue,
  MusicKitSetQueueOptions,
  MusicKitSongAttributes
} from '@flex-development/types'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useArray } from 'react-hanger/array/useArray'
import { useMusicKit } from './useMusicKit'

/**
 * @file Stream a playlist from the Apple Music API
 * @module subdomains/streaming/hooks/usePlaylist
 */

/**
 * `usePlaylist` return type.
 */
export type UsePlaylist = {
  /**
   * Returns the song attributes for the media item located at the indicated
   * array index.
   */
  getSongAttributes(index: number): MusicKitMediaItem['attributes'] | AnyObject

  /**
   * Starts playback of the next media item in the playback queue.
   */
  next: MusicKitInstance['skipToNextItem']

  /**
   * Pauses the playlist.
   */
  pause: MusicKitInstance['pause']

  /**
   * Begins playback of the current media item.
   */
  play: MusicKitInstance['play']

  /**
   * The current queue position.
   */
  position: MusicKitQueue['position']

  /**
   * Starts playback of the next media item in the playback queue.
   */
  previous: MusicKitInstance['skipToPreviousItem']

  /**
   * Array of song attributes for the current playlist.
   */
  songs: Array<MusicKitSongAttributes>
}

/**
 * Returns functions to control playlist streaming via the Apple Music API.
 *
 * @param url - URL of playlist to stream
 * @param play_when_ready - If true, start playback when queue is set
 */
export const usePlaylist = (
  url: MusicKitSetQueueOptions['url'] = '',
  play_when_ready = false
): UsePlaylist => {
  // Get MusicKit instance
  const kit = useMusicKit()

  // Queue state
  const [queue, setMusicKitQueue] = useState<MusicKitQueue | AnyObject>({})

  // Array of song attributes
  const [songs, { setValue: setSongs }] = useArray<UsePlaylist['songs']>([])

  // Update queue and song attributes state
  useEffect(() => {
    if (!kit.developerToken || isEmpty(url)) return

    const musickit = kit as MusicKitInstance
    const options = { url: url } as MusicKitSetQueueOptions

    musickit.setQueue(options).then(queue => {
      setMusicKitQueue(queue)
      setSongs(queue.items.map(({ attributes }) => attributes))
    })
  }, [kit, setMusicKitQueue, setSongs, url])

  // Handle immediate playback
  useEffect(() => {
    if (!kit.player || !queue) return

    if (play_when_ready) (async () => kit.player.play())()

    return () => {
      kit.player.stop()
    }
  }, [kit, play_when_ready, queue])

  return {
    getSongAttributes: (index: number) => songs[index] || {},
    next: kit.skipToNextItem,
    pause: kit.pause,
    play: kit.play,
    position: queue.position || -1,
    previous: kit.skipToPreviousItem,
    songs: queue.items?.map(({ attributes }) => attributes) ?? []
  }
}
