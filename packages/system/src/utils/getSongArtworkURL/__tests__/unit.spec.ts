import type { SongAttributes } from '@kustomzcore/types'
import LAYOUT_DATA from '@system/tests/fixtures/api/layout'
import getSongArtworkURL from '..'

/**
 * @file Unit Tests - getSongArtworkURL
 * @module utils/getSongArtworkURL/tests/unit
 */

describe('unit:getSongArtworkURL', () => {
  const song = LAYOUT_DATA.playlist.tracks[0] as SongAttributes
  const artwork = song.artwork as NonNullable<SongAttributes['artwork']>

  const bad_args = [undefined, {}, { artwork: {} }]

  it('returns a artwork URL without size parameters', () => {
    const { height, width, url } = artwork

    const res = getSongArtworkURL(song)
    const expected = url.replace('{h}', `${height}`).replace('{w}', `${width}`)

    expect(res.includes('{h}')).toBeFalsy()
    expect(res.includes('{w}')).toBeFalsy()
    expect(res).toBe(expected)
  })

  it('returns an empty string if song data is missing', () => {
    bad_args.forEach(arg => expect(getSongArtworkURL(arg)).toBe(''))
  })
})
