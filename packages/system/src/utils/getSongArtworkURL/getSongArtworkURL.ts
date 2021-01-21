import type { AnyObject } from '@flex-development/json'

/**
 * @file Implementation - getSongArtworkURL
 * @module utils/getSongArtworkURL/impl
 */

/**
 * Generates a complete artwork URL for an Apple Music Media item.
 *
 * @param song - Song data
 */
const getSongArtworkURL = (song: AnyObject = {}): string => {
  // If no song data, return empty string
  if (!Object.keys(song).length || !Object.keys(song?.artwork).length) return ''

  // Get song artwork data
  const { height, width, url } = song?.artwork ?? {}

  // Return artwork URL
  return `${url.replace('{h}', `${height}`).replace('{w}', `${width}`)}`
}

export default getSongArtworkURL
