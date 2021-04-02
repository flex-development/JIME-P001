import type { AnyObject } from '@flex-development/json/utils/types'
import { EMPTY_SPACE } from '@kustomzcore/config/constants'
import {
  GRID_BREAKPOINT_KEYS,
  UTILITY_PROP_ALIASES as ALIASES
} from '@system/config/constants'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import type { GridBreakpointKey } from '@system/types'
import genclasses from '@system/utils/genclasses'
import classnames from 'classnames'
import type { ClassDictionary } from 'classnames/types'
import isPlainObject from 'lodash/isPlainObject'
import join from 'lodash/join'
import pick from 'lodash/pick'
import uniq from 'lodash/uniq'
import { useMemo } from 'react'

/**
 * @file Implementation - useUtilityClasses
 * @module hooks/useUtilityClasses/impl
 */

/**
 * Returns a string of utility classes.
 *
 * If any transient utility props are defined on {@param props}, they will be
 * used to generate a string of utility classes.
 *
 * @param {AnyObject} [props] - Component props
 * @param {Record<string, string>} [aliases] - Props to class name map
 * @param {GridBreakpointKey[]} [breakpoints] - Alternate grid breakpoint keys
 * @return {string} Utility classes
 */
export const useUtilityClasses = (
  props: AnyObject = {},
  aliases: Record<string, string> = ALIASES,
  breakpoints: GridBreakpointKey[] = GRID_BREAKPOINT_KEYS
): string => {
  const _aliases = useMemoCompare<typeof aliases>(aliases)
  const _breakpoints = useMemoCompare<typeof breakpoints>(breakpoints)
  const _props = useMemoCompare<typeof props>(props)

  return useMemo<string>(() => {
    // Get utilities config
    const config = pick(_props, Object.keys(_aliases))

    // Grid item class prefixes
    const grid_item_prefix = ['col', 'row']

    // Convert into responsive utility class config object
    Object.keys(_aliases).forEach(alias => {
      const prefix = _aliases[alias]
      const value = config[alias]

      if (!value) {
        delete config[alias]
      } else if (!grid_item_prefix.includes(prefix) && !isPlainObject(value)) {
        config[alias] = { xs: value }
      }
    })

    // Initialize class dictionary
    const dictionary: ClassDictionary = {}

    // Populate dictionary
    Object.keys(_aliases).forEach(alias => {
      const prefix = _aliases[alias]
      const utils = grid_item_prefix.includes(prefix) ? config : config[alias]

      genclasses(prefix, utils, _breakpoints).map(c => {
        dictionary[c] = c?.length > 0
      })
    })

    // Remove booleans and falsy values from dictionary
    delete dictionary.false
    delete dictionary.null
    delete dictionary.true
    delete dictionary.undefined
    delete dictionary['']

    // Get unique dictionary keys
    const uniqkeys = uniq(Object.keys(dictionary))

    // Initialize new dictionary with unique keys
    const udictionary: ClassDictionary = {}

    // Populate dictionary
    uniqkeys.forEach(key => (udictionary[key] = dictionary[key]))

    // Get dictionary as string
    const dstring = classnames(udictionary, _props.className)

    // Return string containing unique class names
    return join(uniq(dstring.split(EMPTY_SPACE)), EMPTY_SPACE).trim()
  }, [_aliases, _breakpoints, _props])
}
