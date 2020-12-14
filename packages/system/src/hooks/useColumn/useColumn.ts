import {
  Columns,
  GridBreakpoint,
  ResponsiveUtility
} from '@flex-development/kustomzcore'
import { GRID_BREAKPOINT_KEYS } from '@system/config'
import { getResponsiveUtilities } from '@system/utils'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'
import { useMemoCompare } from '../useMemoCompare'

/**
 * @file Generate grid column classes
 * @module hooks/useColumn
 */

/**
 * Returns a string of `col-*` classes.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/columns
 *
 * @param config - Grid column span utilities
 * @param breakpoints - Breakpoint keys to use instead of `GRID_BREAKPOINT_KEYS`
 */
export const useColumn = (
  utilities: ResponsiveUtility<boolean | Columns>,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINT_KEYS
): string => {
  const _breakpoints = useMemoCompare<typeof breakpoints>(breakpoints)

  return useMemo(() => {
    const dictionary = {}

    getResponsiveUtilities('col', utilities, _breakpoints).map(c => {
      dictionary[c] = !isEmpty(c)
    })

    const classes = classnames(dictionary).trim()
    return classes.length ? classes : 'col'
  }, [_breakpoints, utilities])
}
