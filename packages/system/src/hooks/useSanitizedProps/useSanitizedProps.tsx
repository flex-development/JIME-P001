import type { AnyObject } from '@flex-development/json/utils/types'
import { EMPTY_SPACE as ES } from '@kustomzcore/constants'
import { useUtilityClasses } from '@system/hooks/useUtilityClasses'
import type { JSXIEPropsOr } from '@system/types'
import classnames from 'classnames'
import type { ClassDictionary } from 'classnames/types'
import isObject from 'lodash/isObject'
import join from 'lodash/join'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import uniq from 'lodash/uniq'

/**
 * @file Implementation - useSanitizedProps
 * @module hooks/useSanitizedProps/impl
 */

/**
 * Uses transient props to add additional (valid) React HTML attributes.
 *
 * Several mutations will be applied:
 *
 * - Parameters used to add additional CSS classes will be used to build a class
 *   dictionary and updated string of class names
 * - {@param props.$html} will be converted into `dangerouslySetInnerHTML`
 * - {@param props.$img} will be used to set a background image
 * - Keys specified in {@param keys} will be removed {@param props}
 *
 * @param props - Component properties
 * @param inject - Class dictionary or class string of additional CSS classes
 * @param keys - Array of keys to remove from {@param props}
 */
export function useSanitizedProps<
  E extends keyof JSX.IntrinsicElements = 'div',
  P = JSXIEPropsOr<E>
>(props: AnyObject, inject?: string | ClassDictionary, keys?: string[]): P {
  // Pluck transient props
  const { $html, $img, ...rest } = props

  // Generate utility class string
  const className = useUtilityClasses(rest)

  // Initialize array containing properties to remove
  const _keys = keys || []

  // Initialize object with sanitized props
  let sanitized: AnyObject = {}

  // Convert injectable classes intro string
  const _inject = isObject(inject) ? classnames(inject).trim() : inject

  // Merge incoming classes and injected classes
  const dstring = classnames(className, _inject).trim()

  // Get unique class names and update CSS classes
  sanitized.className = join(uniq(dstring.split(ES)), ES).trim()

  // Handle dangerouslySetInnerHTML
  if ($html) {
    sanitized.dangerouslySetInnerHTML = { __html: $html }
    _keys.push('children')
  }

  // Handle background image
  if ($img?.trim().length) {
    const style = { backgroundImage: `url(${$img.trim()})` }
    sanitized.style = merge(style, sanitized.style || {})
  }

  // Merge rest of incoming of props and new sanitized props obj
  sanitized = merge(rest, sanitized)

  // Remove all transient props
  Object.keys(sanitized).forEach(key => {
    if (key.startsWith('$')) _keys.push(key)
  })

  // Remove `className` property if an empty string
  if (!sanitized.className?.length) delete sanitized.className

  // Return sanitized props
  return (omit(sanitized, uniq(_keys)) as unknown) as P
}

export default useSanitizedProps
