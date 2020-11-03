import { GridBreakpoint, Primitive } from '@system/types'
import { isBoolean, isNumber, isString } from 'lodash'
import breakpointInfix from './breakpointInfix'

/**
 * @file Create a responsive variation of a CSS class
 * @module utils/createResponsiveUtility
 * @see https://v5.getbootstrap.com/docs/5.0/utilities/api/
 */

/**
 * Creates a responsive variation of a CSS class.
 *
 * @todo Add example usage and output
 *
 * @param prefix - Value to prefix breakpoint infix, e.g 'col' or 'd'
 * @param breakpoint - Grid breakpoint key, xs | sm | md | lg | xl | xxl
 * @param value - Responsive value, e.g 5 or 'wrap'
 */
const createResponsiveUtility = (
  prefix: string,
  breakpoint: GridBreakpoint,
  value?: Primitive
): string => {
  // If false, null, or undefined
  if (value !== 0 && !value) return ''

  let classes = ''
  let append = ''

  if (isNumber(value) || isString(value)) append = `-${value}`

  if ((append !== '' && append !== '-') || (isBoolean(value) && value)) {
    classes = `${prefix}${breakpointInfix(breakpoint)}${append}`
  }

  return classes.trim()
}

export default createResponsiveUtility
