import { RelationalOperator, ResponsiveUtility } from '@flex-development/types'
import { GRID_BREAKPOINTS } from '@system/config'
import { isString } from 'lodash'
import { useEffect } from 'react'
import { useBoolean, UseBooleanActions } from 'react-hanger/array/useBoolean'
import { useSetState } from 'react-hanger/array/useSetState'
import { useWindowSize } from 'use-hooks'

/**
 * @file Toggle element display
 * @module subdomains/app/hooks/useVisibility
 */

/**
 * `useVisibility` return type.
 */
export type UseVisibility = {
  breakpoints: Required<ResponsiveUtility<boolean>>
  setVisibility: UseBooleanActions['setValue']
  toggleVisibility: UseBooleanActions['toggle']
  visible: boolean
}

/**
 * Returns a boolean indiciating the visbility of an element, as well as
 * functions to set and toggle the element's visibility.
 *
 * An object will also be returned that indicates the value of the
 * `visible` state at a given breakpoint.
 *
 * @param breakpoint - Breakpoint to hide / show element based on operator
 * @param operator - Relational operator to compare window width to breakponint
 * @param is_visible - Initial visibility
 */
export const useVisibility = (
  breakpoint: number | string = 0,
  operator: RelationalOperator = '>',
  is_visible = true
): UseVisibility => {
  // Initialize main visibile state
  const [visible, visibilityActions] = useBoolean(is_visible)

  // Initialize breakpont visibility state
  const [breakpoints, setBreakpoints] = useSetState<
    UseVisibility['breakpoints']
  >({ lg: true, md: true, sm: true, xl: true, xs: true, xxl: true })

  // Get window width to determine visibility at certain breakpoints
  const { width: window_width } = useWindowSize()

  // Toggle visibility
  useEffect(() => {
    const b_value = isString(breakpoint) ? JSON.parse(breakpoint) : breakpoint

    let visibility = true

    switch (operator) {
      case '>=':
        visibility = window_width >= b_value
        break
      case '<':
        visibility = window_width < b_value
        break
      case '<=':
        visibility = window_width <= b_value
        break
      case '==':
        visibility = window_width === b_value
        break
      case '!=':
        visibility = window_width !== b_value
        break
      default:
        visibility = window_width > b_value
    }

    visibilityActions.setValue(visibility)
  }, [breakpoint, operator, visibilityActions, window_width])

  // Determine visibility at each breakpoint
  useEffect(() => {
    const breakpoint_v = {}

    Object.keys(GRID_BREAKPOINTS).forEach(key => {
      breakpoint_v[key] = visible && window_width < GRID_BREAKPOINTS[key]
    })

    setBreakpoints(breakpoint_v)
  }, [setBreakpoints, visible, window_width])

  return {
    breakpoints,
    setVisibility: visibilityActions.setValue,
    toggleVisibility: visibilityActions.toggle,
    visible
  }
}
