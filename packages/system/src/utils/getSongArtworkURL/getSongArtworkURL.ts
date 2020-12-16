import { AnyObject } from '@flex-development/json'
import { MusicKitSongAttributes } from '@flex-development/kustomzcore'
import { isEmpty } from 'lodash'

/**
 * @file Generate song artwork URL for Apple Music Media
 * @module utils/getSongArtworkURL/impl
 */

/**
 * Generates a complete artwork URL for an Apple Music Media item.
 *
 * @param song - Song data
 */
const getSongArtworkURL = (song?: AnyObject): string => {
  // If no song data, return empty string
  if (isEmpty(song) || isEmpty(song?.artwork)) return ''

  // Get song artwork data
  const { height, width, url } = (song as MusicKitSongAttributes).artwork

  // Return artwork URL
  return `${url.replace('{h}', `${height}`).replace('{w}', `${width}`)}`
}

export default getSongArtworkURL
