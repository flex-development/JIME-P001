import { AnyObject } from '@flex-development/json/utils/types'
import {
  GRID_BREAKPOINT_KEYS,
  UTILITY_PROP_ALIASES as ALIASES
} from '@system/config/constants'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import { GridBreakpointKey } from '@system/types'
import { genclasses } from '@system/utils/genclasses'
import classnames from 'classnames'
import { ClassDictionary } from 'classnames/types'
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
 * @param props - Component props
 * @param aliases - Object mapping prop names to class prefixes. Defaults to
 * global prop aliases object
 * @param breakpoints - Array of grid reakpoint keys to use instead of default
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

    // Convert into responsive utility class config object
    Object.keys(_aliases).forEach(alias => {
      const value = config[alias]

      if (!value) {
        delete config[alias]
      } else if (!isPlainObject(value)) {
        config[alias] = { xs: value }
      }
    })

    // Initialize class dictionary
    const dictionary: ClassDictionary = {}

    // Populate dictionary
    Object.keys(_aliases).forEach(alias => {
      const prefix = _aliases[alias]

      genclasses(prefix, config[alias], _breakpoints).map(c => {
        dictionary[c] = c?.length > 0
      })
    })

    // Remove booleans and falsy values from dictionary
    delete dictionary.false
    delete dictionary.null
    delete dictionary.true
    delete dictionary.undefined

    // Get dictionary as string
    const dstring = classnames(dictionary, _props.className)

    // Return string containing unique class names
    return join(uniq(dstring.split(' ')), ' ').trim()
  }, [_aliases, _breakpoints, _props])
}
