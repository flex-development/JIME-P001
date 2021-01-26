import type { AnyObject } from '@flex-development/json'
import type { SongAttributes } from '@flex-development/kustomzcore'
import type { UseActiveIndex } from '@system/hooks/useActiveIndex'
import { useActiveIndex } from '@system/hooks/useActiveIndex'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import clamp from 'lodash/clamp'
import { useCallback } from 'react'

/**
 * @file Use array of Apple Music song attributes
 * @module hooks/useSongAttributes/impl
 */

export type UseSongAttributes = {
  active: UseActiveIndex['active']
  isActive: UseActiveIndex['isActive']
  next: () => void
  previous: () => void
  song: SongAttributes | AnyObject
}

/**
 * Returns an array of songs and functions to set the active song index.
 *
 * @param songs - Array of song attributes
 * @param curr - Current song index
 */
export const useSongAttributes = (
  songs: SongAttributes[] = [],
  curr = 0
): UseSongAttributes => {
  // Handle internal songs state
  const _songs = useMemoCompare<SongAttributes[]>(songs)

  /**
   * Clamps {@param index} between 0 and the number of the songs in the songs
   * state array.
   *
   * @param index - New active song index
   */
  const clampIndex = (index: number) => clamp(index, 0, _songs.length - 1)

  /* Callback version of `clampIndex` */
  const clampIndexCB = useCallback(clampIndex, [_songs])

  // Handle active song index
  const active = useActiveIndex(clampIndexCB(curr))

  // Handle current song state
  const song = useMemoCompare<SongAttributes | AnyObject>(
    _songs[active.active] || {}
  )

  /**
   * Increases the active index by 1.
   */
  const next = () => {
    let new_active = active.active + 1
    new_active = new_active > _songs.length - 1 ? 0 : new_active

    return active.setIndex(clampIndexCB(new_active))
  }

  /* Callback version of `next` */
  const nextCB = useCallback(next, [_songs, active, clampIndexCB])

  /**
   * Reduces the active index by 1.
   */
  const previous = () => {
    let new_active = active.active - 1
    new_active = new_active < 0 ? _songs.length - 1 : new_active

    return active.setIndex(clampIndexCB(new_active))
  }

  /* Callback version of `previous` */
  const previousCB = useCallback(previous, [_songs, active, clampIndexCB])

  return {
    active: active.active,
    isActive: active.isActive,
    next: nextCB,
    previous: previousCB,
    song
  }
}
