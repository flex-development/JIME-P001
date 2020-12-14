import {
  FlexboxUtilitiesConfig,
  GridBreakpoint
} from '@flex-development/kustomzcore'
import {
  FLEXBOX_CONFIG_KEYS,
  FLEXBOX_PROPERTY_MAP,
  GRID_BREAKPOINT_KEYS
} from '@system/config'
import { getResponsiveUtilities } from '@system/utils'
import classnames from 'classnames'
import { isBoolean, isEmpty, isNumber, isString } from 'lodash'
import { useMemo } from 'react'
import { useMemoCompare } from '../useMemoCompare'

/**
 * @file Generate flexbox utility classes
 * @module hooks/useFlexbox
 */

/**
 * Generates a string of flexbox utility classes.
 *
 * Supports standard and responsive variations for the following flexbox
 * properties:
 *
 * - `align-items`
 * - `display`
 * - `flex-direction`
 * - `flex-wrap`
 * - `justify-content`
 *
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/flex
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox
 *
 * @param config - Flexbox config
 * @param breakpoints - Breakpoint keys to use instead of `GRID_BREAKPOINT_KEYS`
 */
export const useFlexbox = (
  config: FlexboxUtilitiesConfig,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINT_KEYS
): string => {
  const _breakpoints = useMemoCompare<typeof breakpoints>(breakpoints)
  const _config = useMemoCompare<typeof config>(config)

  return useMemo<string>(() => {
    const dictionary = {}

    // Convert config into Record<string, ResponsiveUtility>
    FLEXBOX_CONFIG_KEYS.forEach(ckey => {
      const value = _config[ckey]

      if (isBoolean(value) || isNumber(value) || isString(value)) {
        _config[ckey] = { xs: value }
      }
    })

    // Populate dictionary
    FLEXBOX_CONFIG_KEYS.forEach(ckey => {
      let prefix = FLEXBOX_PROPERTY_MAP[ckey]

      if (ckey === 'display') {
        prefix = 'd'
      } else if (ckey === 'direction' || ckey === 'wrap') {
        prefix = 'flex'
      }

      getResponsiveUtilities(prefix, _config[ckey], _breakpoints).map(c => {
        dictionary[c] = !isEmpty(c)
      })
    })

    return classnames(dictionary).trim()
  }, [_breakpoints, _config])
}
