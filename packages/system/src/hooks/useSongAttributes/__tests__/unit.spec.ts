import LAYOUT_DATA from '@system/tests/fixtures/api/layout'
import { act, renderHook } from '@testing-library/react-hooks'
import { useSongAttributes } from '../useSongAttributes'

/**
 * @file Unit Tests - useSongAttributes
 * @module hooks/useSongAttributes/tests/unit
 */

describe('unit:useSongAttributes', () => {
  const SONGS = LAYOUT_DATA.playlist.tracks

  describe('initial state', () => {
    describe('active', () => {
      it('in range', () => {
        const curr = SONGS.length - 1

        const { result } = renderHook(() => useSongAttributes(SONGS, curr))

        expect(result.current.active).toBe(curr)
        expect(result.current.song).toMatchObject(SONGS[curr])
      })

      it('out of range', () => {
        const curr = SONGS.length + 1

        const { result } = renderHook(() => useSongAttributes(SONGS, curr))

        expect(result.current.active).toBe(0)
        expect(result.current.song).toMatchObject(SONGS[0])
      })
    })

    it('song', () => {
      const { result } = renderHook(() => useSongAttributes(SONGS))

      expect(result.current.song).toMatchObject(SONGS[0])
    })
  })

  describe('actions', () => {
    describe('isActive', () => {
      it('returns false', () => {
        const { result } = renderHook(() => useSongAttributes(SONGS))

        expect(result.current.isActive(1)).toBeFalsy()
      })

      it('returns true', () => {
        const { result } = renderHook(() => useSongAttributes(SONGS))

        expect(result.current.isActive(0)).toBeTruthy()
      })
    })

    describe('next', () => {
      it('current song last', () => {
        const curr = SONGS.length - 1

        const { result } = renderHook(() => useSongAttributes(SONGS, curr))

        act(() => {
          result.current.next()
        })

        expect(result.current.active).toBe(0)
        expect(result.current.song).toMatchObject(SONGS[0])
      })

      it('current song not last', () => {
        const curr = 1

        const { result } = renderHook(() => useSongAttributes(SONGS, curr))

        act(() => {
          result.current.next()
        })

        const eactive = curr + 1

        expect(result.current.active).toBe(eactive)
        expect(result.current.song).toMatchObject(SONGS[eactive])
      })
    })

    describe('previous', () => {
      it('current song first', () => {
        const { result } = renderHook(() => useSongAttributes(SONGS))

        act(() => {
          result.current.previous()
        })

        const eactive = SONGS.length - 1

        expect(result.current.active).toBe(eactive)
        expect(result.current.song).toMatchObject(SONGS[eactive])
      })

      it('current song not first', () => {
        const curr = SONGS.length - 1

        const { result } = renderHook(() => useSongAttributes(SONGS, curr))

        act(() => {
          result.current.previous()
        })

        const eactive = curr - 1

        expect(result.current.active).toBe(eactive)
        expect(result.current.song).toMatchObject(SONGS[eactive])
      })
    })
  })
})
