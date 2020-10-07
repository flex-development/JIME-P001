import { MutatedProps } from '@kustomz/types'
import classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { isObject, isString, omit, uniq } from 'lodash'
import { Children, HTMLAttributes } from 'react'

/**
 * @file Add global mutations to incoming props
 * @module hooks/useMutatedProps
 */

/**
 * Adds global mutations to the incoming component properties.
 *
 * Mutations (in order, if props are defined):
 *
 * - Convert {@param props.children} into an array
 * - {@param props.innerHTML} will be converted into `dangerouslySetInnerHTML`
 * - {@param props.flex} (if defined) will be used to add flexbox classes
 * - {@param inject} will be passed to `classnames` function
 * - If the resulting class name is an empty string, it'll be set to undefined
 * - Keys specified in {@param keys} will be removed {@param props}
 *
 * @param props - Component properties
 * @param props.children - Component children
 * @param props.flex - Append flexbox classes
 * @param inject - Classes to inject before {@param props.className}
 * @param keys - Array of keys to remove from {@param props}
 */
export function useMutatedProps<
  T1 extends MutatedProps = MutatedProps,
  Mask = HTMLAttributes<HTMLElement>
>(props: T1, injectClass?: ClassValue, keys?: string[]): Mask {
  // Props are read-only so we need a copy
  const mutatedProps = { ...props }

  // Initialize array containing properties to remove
  keys = keys || []

  // Convert children into array
  if (mutatedProps.children) {
    mutatedProps.children = Children.toArray(mutatedProps.children)
  } else {
    mutatedProps.children = []
  }

  // Handle dangerouslySetInnerHTML
  if (mutatedProps.innerHTML) {
    mutatedProps.dangerouslySetInnerHTML = { __html: mutatedProps.innerHTML }

    keys.push('innerHTML')
    keys.push('children')
  }

  // Handle flexbox utility classes
  if (mutatedProps.flex) {
    const { flex } = mutatedProps

    injectClass = isObject(injectClass) ? injectClass : {}
    injectClass[`d-${isString(flex) ? 'inline-' : ''}flex`] = flex

    keys.push('flex')
  }

  // Merge injection classes and original classes
  if (mutatedProps.className || injectClass) {
    mutatedProps.className = classnames(injectClass, mutatedProps.className)
  }

  // Remove class attribute if empty
  if (!mutatedProps.className?.length) mutatedProps.className = undefined

  // Remove keys and return mutated props
  return omit(mutatedProps, uniq(keys)) as Mask
}

export default useMutatedProps
