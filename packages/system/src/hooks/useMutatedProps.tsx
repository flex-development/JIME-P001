import { createResponsiveUtility } from '@system/utils'
import classnames from 'classnames'
import { ClassDictionary } from 'classnames/types'
import { isObject, merge, omit, uniq } from 'lodash'
import { HTMLAttributes } from 'react'
import { MutatedProps } from '../types'
import { useSpacers } from './useSpacers'

/**
 * @file Add global mutations to incoming props
 * @module hooks/useMutatedProps
 */

/**
 * Adds global mutations to the incoming component properties.
 *
 * Mutations (in order, if props are defined):
 *
 * - Spacing utility properties will be used to creating create utility classes
 * - {@param props.flex} will be used to add flexbox display classes
 * - {@param props.img} will be used to set a background image
 * - {@param props.innerHTML} will be converted into `dangerouslySetInnerHTML`
 * - {@param inject} and updated class dictionary will be passed to `classnames`
 *   function. If the result is an empty string, the `className` property of the
 *   return value will be set to undefined
 * - Keys specified in {@param keys} will be removed {@param props}
 *
 * @param props - Component properties
 * @param inject - Classes to inject before {@param props.className}
 * @param keys - Array of keys to remove from {@param props}
 */
export function useMutatedProps<
  T1 extends MutatedProps = MutatedProps,
  Mask = HTMLAttributes<HTMLElement>
>(props: T1, inject?: string | ClassDictionary, keys?: string[]): Mask {
  const {
    flex: flexbox_display,
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

  // Props are read-only so we need a copy
  const mutated = Object.assign({}, rest)

  // Initalize class dictionary
  const dictionary = isObject(inject) ? inject : { [`${inject}`]: true }

  // Remove booleans and falsy values from dictionary
  delete dictionary.false
  delete dictionary.null
  delete dictionary.true
  delete dictionary.undefined

  // Initialize array containing properties to remove
  keys = keys || []

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

  // Update class dictionary with spacing utilities
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

  // Handle flexbox display utility
  if (flexbox_display) {
    const display = flexbox_display === 'inline' ? 'inline-flex' : 'flex'

    dictionary[createResponsiveUtility('d', 'xs', display)] = true
  }

  // Handle background image
  if (img) {
    mutated.style = merge(mutated.style || {}, {
      backgroundImage: `url(${img})`
    })
  }

  // Handle dangerouslySetInnerHTML
  if (innerHTML) {
    mutated.dangerouslySetInnerHTML = { __html: innerHTML }
    keys.push('children')
  }

  // Merge original classes and class dictionary
  mutated.className = classnames(mutated?.className?.trim(), dictionary).trim()

  // Remove class attribute if empty
  if (!mutated.className.length) delete mutated.className

  // Remove keys and return mutated props
  return omit(mutated, uniq(keys)) as Mask
}

export default useMutatedProps
