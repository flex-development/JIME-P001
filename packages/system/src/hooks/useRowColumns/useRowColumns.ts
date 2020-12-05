import {
  GridBreakpoint,
  ResponsiveUtility,
  RowColumns
} from '@flex-development/kustomzcore'
import { GRID_BREAKPOINT_KEYS } from '@system/config'
import { getResponsiveUtilities } from '@system/utils'
import classnames from 'classnames'
import { isEmpty, isEqual } from 'lodash'
import { useMemo } from 'react'
import { MemoCompare } from '../useMemoCompare'
import useMemoCompare from '../useMemoCompare/useMemoCompare'

/**
 * @file Generate row utility classes
 * @module hooks/useRowColumns
 */

/**
 * Returns a string of `row-cols-*` classes.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/grid/#row-columns
 *
 * @param config - Row column config
 * @param breakpoints - Breakpoint keys to use instead of `GRID_BREAKPOINT_KEYS`
 */
export const useRowColumns = (
  config: ResponsiveUtility<RowColumns>,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINT_KEYS
): string => {
  const _compare: MemoCompare = (previous, next) => isEqual(previous, next)

  const _breakpoints = useMemoCompare<typeof breakpoints>(breakpoints, _compare)
  const _config = useMemoCompare<typeof config>(config, _compare)

  return useMemo<string>(() => {
    const dictionary = {}

    getResponsiveUtilities('row-cols', _config, _breakpoints).map(classes => {
      dictionary[classes] = !isEmpty(classes)
    })

    return classnames(dictionary).trim()
  }, [_breakpoints, _config])
}
