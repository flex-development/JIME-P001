import {
  GridBreakpoint,
  ResponsiveUtility,
  Spacer,
  SpacerPrefix
} from '@flex-development/kustomzcore'
import { GRID_BREAKPOINT_KEYS } from '@system/config'
import { getResponsiveUtilities } from '@system/utils'
import classnames from 'classnames'
import { isEmpty, isEqual, isObject } from 'lodash'
import { useMemo } from 'react'
import { MemoCompare, useMemoCompare } from '../useMemoCompare'
/**
 * @file Generate gutter, margin, or padding utility classes
 * @module hooks/useSpacers/impl
 */

/**
 * Generates a string of gutter, margin, or padding utility classes.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/gutters
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/spacing
 *
 * @param prefix - Gutter, margin, or padding utility class prefix
 * @param config - Gutter, margin, or padding utilities config
 * @param breakpoints - Breakpoint keys to use instead of `GRID_BREAKPOINT_KEYS`
 */
export const useSpacers = (
  prefix: SpacerPrefix,
  config: Spacer | ResponsiveUtility<Spacer>,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINT_KEYS
): string => {
  config = isObject(config) ? config : { xs: config }

  const _compare: MemoCompare = (previous, next) => isEqual(previous, next)

  const _breakpoints = useMemoCompare<typeof breakpoints>(breakpoints, _compare)
  const _config = useMemoCompare<typeof config>(config, _compare)

  return useMemo<string>(() => {
    const dictionary = {}

    _breakpoints.forEach(breakpoint => {
      const value = _config[breakpoint]

      if (value === 0 || value) {
        getResponsiveUtilities(prefix, _config, _breakpoints).map(classes => {
          dictionary[classes] = !isEmpty(classes)
        })
      }
    })

    return classnames(dictionary).trim()
  }, [_breakpoints, _config, prefix])
}
