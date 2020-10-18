import classnames from 'classnames'
import { ClassDictionary } from 'classnames/types'
import { isObject, isString, omit, uniq } from 'lodash'
import { HTMLAttributes } from 'react'
import { MutatedProps } from '../types'

/**
 * @file Add global mutations to incoming props
 * @module hooks/useMutatedProps
 */

/**
 * Adds global mutations to the incoming component properties.
 *
 * Mutations (in order, if props are defined):
 *
 * - {@param props.img} will be used to set a background image
 * - {@param props.innerHTML} will be converted into `dangerouslySetInnerHTML`
 * - {@param props.flex} (if defined) will be used to add flexbox classes
 * - {@param inject} will be passed to `classnames` function
 * - If the resulting class name is an empty string, it'll be set to undefined
 * - Keys specified in {@param keys} will be removed {@param props}
 *
 * @param props - Component properties
 * @param props.children - Component children
 * @param props.flex - Append flexbox classes
 * @param props.img - Set a background image
 * @param props.innerHTML - Set `dangerouslySetInnerHTML.__html`
 * @param inject - Classes to inject before {@param props.className}
 * @param keys - Array of keys to remove from {@param props}
 */
export function useMutatedProps<
  T1 extends MutatedProps = MutatedProps,
  Mask = HTMLAttributes<HTMLElement>
>(props: T1, injectClass?: string | ClassDictionary, keys?: string[]): Mask {
  // Props are read-only so we need a copy
  const mutated = { ...props }

  // Initialize array containing properties to remove
  keys = keys || []

  // Handle background image
  if (mutated.img) {
    mutated.style = mutated.style || {}
    mutated.style.backgroundImage = `url(${mutated.img})`

    keys.push('img')
  }

  // Handle dangerouslySetInnerHTML
  if (mutated.innerHTML) {
    mutated.dangerouslySetInnerHTML = { __html: mutated.innerHTML }

    keys.push('innerHTML')
    keys.push('children')
  }

  // Handle flexbox utility classes
  if (mutated.flex) {
    const { flex } = mutated

    injectClass = isObject(injectClass) ? injectClass : {}
    injectClass[`d-${isString(flex) ? 'inline-' : ''}flex`] = flex

    keys.push('flex')
  }

  // Merge injection classes and original classes
  if (mutated.className || injectClass) {
    mutated.className = classnames(injectClass, mutated.className)
  }

  // Remove class attribute if empty
  if (!mutated.className?.length) mutated.className = undefined

  // Remove keys and return mutated props
  return omit(mutated, uniq(keys)) as Mask
}

export default useMutatedProps
