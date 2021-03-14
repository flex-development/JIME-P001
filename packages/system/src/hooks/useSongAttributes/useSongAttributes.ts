import type { AnyObject } from '@flex-development/json/utils/types'
import type { SongAttributes } from '@kustomzcore/types'
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
  /**
   * Index of active song.
   */
  active: UseActiveIndex['active']

  /**
   * Returns true if {@param curr} is equal to the index of the active song.
   */
  isActive: UseActiveIndex['isActive']

  /**
   * Skip to the next song.
   */
  next: () => void

  /**
   * Go to the previous song.
   */
  previous: () => void

  /**
   * Current song data or empty object.
   */
  song: SongAttributes | AnyObject
}

/**
 * Returns an array of songs and functions to set the active song index.
 *
 * @param {SongAttributes[]} [songs] - Array of song attributes
 * @param {number} [curr] - Current song index
 * @return {UseSongAttributes} Hook state
 */
export const useSongAttributes = (
  songs: SongAttributes[] = [],
  curr: number = 0
): UseSongAttributes => {
  // Handle internal songs state
  const _songs = useMemoCompare<SongAttributes[]>(songs)

  /**
   * Clamps {@param i} between 0 and the number of the songs in the songs
   * state array.
   *
   * @param {number} i - New active song index
   * @return {number} Formatted index
   */
  const clampIndex = (i: number): number => clamp(i, 0, _songs.length - 1)

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
   *
   * @return {void}
   */
  const next = (): void => {
    let new_active = active.active + 1
    new_active = new_active > _songs.length - 1 ? 0 : new_active

    return active.setIndex(clampIndexCB(new_active))
  }

  /* Callback version of `next` */
  const nextCB = useCallback(next, [_songs, active, clampIndexCB])

  /**
   * Reduces the active index by 1.
   *
   * @return {void}
   */
  const previous = (): void => {
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
