import { SONGS } from '@tests/system/__mocks__/utils'
import getSongArtworkURL from './getSongArtworkURL'

/**
 * @file Tests - getSongArtworkURL
 * @module utils/getSongArtworkURL/spec
 */

describe('getSongArtworkURL', () => {
  const song = SONGS[0]
  const bad_args = [undefined, {}, { artwork: {} }]

  it('returns a artwork URL without size parameters', () => {
    const { height, width, url } = song.artwork

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
