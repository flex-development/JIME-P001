import { AnyObject } from '@flex-development/json'
import { MutatedProps } from '@system/types'
import { createResponsiveUtility } from '@system/utils'
import classnames from 'classnames'
import { ClassDictionary } from 'classnames/types'
import { isEmpty, isObject, join, merge, omit, uniq } from 'lodash'
import { useCallback, useMemo } from 'react'
import { useIcon } from '../useIcon'
import { useSpacers } from '../useSpacers'

/**
 * @file Sanitized mutated component properties
 * @module hooks/useSanitizedProps/impl
 */

/**
 * Returns an object containing sanitized component properties.
 *
 * Several mutations will be applied:
 *
 * - Parameters used to add additional CSS classes will be used to build a class
 *   dictionary and update string of class names
 * - {@param props.img} will be used to set a background image
 * - {@param props.innerHTML} will be converted into `dangerouslySetInnerHTML`
 * - Keys specified in {@param keys} will be removed {@param props}
 *
 * @param props - Component properties
 * @param inject - Class dictionary or class string of additional CSS classes
 * @param keys - Array of keys to remove from {@param props}
 */
export function useSanitizedProps<
  MP extends MutatedProps = MutatedProps,
  Sanitized = AnyObject
>(props: MP, inject?: string | ClassDictionary, keys?: string[]): Sanitized {
  const {
    bg,
    c,
    className,
    flex,
    gradient,
    img,
    innerHTML,
    mb = {},
    ml = {},
    mr = {},
    mt = {},
    mx = {},
    my = {},
    pb = {},
    pl = {},
    pr = {},
    pt = {},
    px = {},
    py = {},
    ...rest
  } = props

  // Convert injectable lasses intro string
  const _inject = isObject(inject) ? classnames(inject).trim() : inject

  // Initialize array containing properties to remove
  const _keys = keys || []

  // Can only set `children` or `dangerouslySetInnerHTML`
  if (innerHTML) {
    _keys.push('children')
  } else if (!rest.dangerouslySetInnerHTML) {
    // Don't remove `dangerouslySetInnerHTML` if in original props
    _keys.push('dangerouslySetInnerHTML')
  }

  // Handle icons
  const _rest = useIcon<MP>(rest as MP)

  // Get spacing utility classes
  const margin_bottom = useSpacers('mb', mb)
  const margin_left = useSpacers('ml', ml)
  const margin_right = useSpacers('mr', mr)
  const margin_top = useSpacers('mt', mt)
  const margin_x = useSpacers('mx', mx)
  const margin_y = useSpacers('my', my)
  const padding_bottom = useSpacers('pb', pb)
  const padding_left = useSpacers('pl', pl)
  const padding_right = useSpacers('pr', pr)
  const padding_top = useSpacers('pt', pt)
  const padding_x = useSpacers('px', px)
  const padding_y = useSpacers('py', py)

  /**
   * Generates an updated string of class names using the incoming classes,
   * injected classes, and the properties used to add additional CSS classes.
   */
  const dstring = useMemo<string>(() => {
    // Initialize class dictionary with injected classes
    const dictionary: ClassDictionary = {}

    // Add spacing utilities to dictionary
    dictionary[margin_bottom] = margin_bottom.length !== 0
    dictionary[margin_left] = margin_left.length !== 0
    dictionary[margin_right] = margin_right.length !== 0
    dictionary[margin_top] = margin_top.length !== 0
    dictionary[margin_x] = margin_x.length !== 0
    dictionary[margin_y] = margin_y.length !== 0
    dictionary[padding_bottom] = padding_bottom.length !== 0
    dictionary[padding_left] = padding_left.length !== 0
    dictionary[padding_right] = padding_right.length !== 0
    dictionary[padding_top] = padding_top.length !== 0
    dictionary[padding_x] = padding_x.length !== 0
    dictionary[padding_y] = padding_y.length !== 0

    // Add background color utility to dictionary
    if (bg) dictionary[`bg-${bg}`] = true

    // Add text color utility to dictionary
    if (c) dictionary[`c-${c}`] = true

    // Add flexbox display utility to dictionary
    if (flex) {
      const display = flex === 'inline' ? 'inline-flex' : 'flex'
      dictionary[createResponsiveUtility('d', 'xs', display)] = true
    }

    // Add background gradient utility to dictionary
    if (gradient) dictionary['bg-gradient'] = true

    // Remove booleans and falsy values from dictionary
    delete dictionary.false
    delete dictionary.null
    delete dictionary.true
    delete dictionary.undefined

    // Merge incoming classes, injected classes, and dictionary classes
    const _dstring = classnames(className, _inject, dictionary).trim()

    // Return string containing unique class names
    return join(uniq(_dstring.split(' ')), ' ').trim()
  }, [
    _inject,
    bg,
    c,
    className,
    flex,
    gradient,
    margin_bottom,
    margin_left,
    margin_right,
    margin_top,
    margin_x,
    margin_y,
    padding_bottom,
    padding_left,
    padding_right,
    padding_top,
    padding_x,
    padding_y
  ])

  /**
   * Sanitizes the incoming component properties.
   *
   * The return object will contain the original component properties and the
   * updated string of class names. The `style.backgroundImage` and
   * `dangerouslySetInnerHTML` properties will be updated as well.
   */
  const sanitized = useCallback<() => Partial<Sanitized>>(() => {
    // Props are read-only so we need a copy
    const _sanitized: AnyObject = {}

    // Update CSS classes
    _sanitized.className = dstring.length ? dstring : undefined

    // Handle background image
    if (!isEmpty(img)) {
      const style = { backgroundImage: `url(${img})` }
      _sanitized.style = merge(style, _sanitized.style || {})
    }

    // Handle dangerouslySetInnerHTML
    if (innerHTML) _sanitized.dangerouslySetInnerHTML = { __html: innerHTML }

    return _sanitized as Partial<Sanitized>
  }, [dstring, img, innerHTML])

  // Handle keys to remove and return sanitized props
  const _sanitized = omit(merge(_rest, sanitized()), uniq(_keys))

  // Remove `className` property if an empty string
  if (!_sanitized.className?.length) delete _sanitized.className

  return _sanitized as Sanitized
}

export default useSanitizedProps
