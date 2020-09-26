import { AnyObject } from '@flex-development/kustomtypez'
import { MutatedProps } from '@kustomz/types'
import classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { isObject, isString, omit, uniq } from 'lodash'
import { HTMLAttributes } from 'react'

/**
 * @file Add global mutations to incoming props
 * @module hooks/useMutatedProps
 */

/**
 * Adds global mutations to the incoming component properties.
 *
 * Mutations (in order, if props are defined):
 *
 * - {@param props.innerHTML} will be converted into `dangerouslySetInnerHTML`
 * - {@param props.flex} (if defined) will be used to update flexbox classes
 * - {@param props.variant} (if defined) will be used to update the `bg-` class
 * - {@param inject} will be passed to `classnames` function
 * - Keys specified in {@param keys} will be removed {@param props}
 *
 * @param props - Component properties
 * @param props.children - Component children
 * @param props.flex - Append flexbox classes
 * @param props.variant - Append `bg-` classes
 * @param inject - Classes to inject before {@param props.className}
 * @param keys - Array of keys to remove from {@param props}
 */
export function useMutatedProps<
  T1 = MutatedProps,
  Mask = HTMLAttributes<HTMLElement>
>(props: T1, injectClass?: ClassValue, keys?: string[]): Mask {
  // Props are read-only so we need a copy
  const mutatedProps = Object.assign({}, props) as MutatedProps

  // Initialize array containing properties to remove
  keys = keys || []

  // Handle dangerouslySetInnerHTML
  if (mutatedProps.innerHTML) {
    mutatedProps.dangerouslySetInnerHTML = { __html: mutatedProps.innerHTML }

    keys.push('innerHTML')
    keys.push('children')
  }

  // Handle flexbox utility classes
  // TODO: Move to separate hook
  if (mutatedProps.flex) {
    const { flex } = mutatedProps

    injectClass = isObject(injectClass) ? injectClass : {}
    injectClass[`d-${isString(flex) ? 'inline-' : ''}flex`] = flex

    keys.push('flex')
  }

  // Handle background and outline color utility classes
  // TODO: Move to separate hook
  if ((mutatedProps as AnyObject).variant) {
    const { variant } = mutatedProps as AnyObject

    injectClass = isObject(injectClass) ? injectClass : {}
    injectClass[`${injectClass.btn ? 'btn' : 'bg'}-${variant}`] = variant

    keys.push('variant')
  }

  // Merge injection classes and original classes
  if (injectClass) {
    mutatedProps.className = classnames(injectClass, mutatedProps.className)
  }

  return omit(mutatedProps, uniq(keys)) as Mask
}

export default useMutatedProps
