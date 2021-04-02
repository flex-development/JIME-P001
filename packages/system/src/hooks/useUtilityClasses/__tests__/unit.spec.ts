import {
  GRID_ROW_UTILITY_CLASS,
  UTILITY_PROP_ALIASES as ALIASES
} from '@system/config/constants'
import { renderHook } from '@testing-library/react-hooks'
import { useUtilityClasses } from '../useUtilityClasses'

/**
 * @file Unit Tests - useUtilityClasses
 * @module hooks/useUtilityClasses/tests/unit
 */

describe('unit:useUtilityClasses', () => {
  describe('general utilities', () => {
    it('not responsive', () => {
      const key = '$mb'

      const props = { [key]: 5 }

      const { result } = renderHook(() => useUtilityClasses(props))

      expect(result.current).toBe(`${ALIASES[key]}-${props[key]}`)
    })

    it('responsive', () => {
      const key = '$fs'
      const rkey = 'sm'

      const props = { [key]: { [rkey]: 'lg' } }

      const { result } = renderHook(() => useUtilityClasses(props))

      const expected = `${rkey}:${ALIASES[key]}-${props[key][rkey]}`

      expect(result.current).toBe(expected)
    })
  })

  it('grid item utilities', () => {
    const key = 'lg'

    const props = { [key]: 5 }
    const aliases = { [key]: GRID_ROW_UTILITY_CLASS }

    const { result } = renderHook(() => useUtilityClasses(props, aliases))

    const expected = `${key}:${GRID_ROW_UTILITY_CLASS}-${props[key]}`

    expect(result.current).toBe(expected)
  })
})
