import {
  AnyObject,
  MusicKitInstance,
  MusicKitQueue,
  MusicKitSetQueueOptions,
  MusicKitSongAttributes
} from '@flex-development/types'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { UseMusicKit, useMusicKit } from './useMusicKit'

/**
 * @file Stream a playlist from the Apple Music API
 * @module subdomains/streaming/hooks/usePlaylist
 */

/**
 * `usePlaylist` return type.
 */
export type UsePlaylist = {
  /**
   * Returns the attributes for the current song.
   */
  currentSong(queue: MusicKitQueue): MusicKitSongAttributes

  /**
   * MusicKit instance or empty object.
   */
  kit: UseMusicKit

  /**
   * MusicKit Queue instance or empty object.
   */
  queue: MusicKitQueue | AnyObject
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
  const [queue, setMusicKitQueue] = useState<UsePlaylist['queue']>({})

  // Handle ready state
  const [ready, setReady] = useState<boolean>(false)

  // Update queue and song attributes state
  useEffect(() => {
    if (isEmpty(kit) || isEmpty(url)) return

    const musickit = kit as MusicKitInstance
    const options = { url: url } as MusicKitSetQueueOptions

    musickit.setQueue(options).then(queue => {
      setMusicKitQueue(queue)
    })
  }, [kit, queue, setMusicKitQueue, url])

  // Handle immediate playback
  useEffect(() => {
    if (!kit.player || !queue) return

    if (play_when_ready) (async () => kit.player.changeToMediaAtIndex(0))()

    return () => {
      kit.player.stop()
    }
  }, [kit, play_when_ready, queue])

  /**
   * Returns the attributes for the current song.
   */
  const currentSong = (queue: MusicKitQueue): MusicKitSongAttributes => {
    const { position: pos } = queue
    return queue.item(pos === -1 ? 0 : pos)?.attributes || {}
  }

  return {
    currentSong,
    kit,
    queue
  }
}
