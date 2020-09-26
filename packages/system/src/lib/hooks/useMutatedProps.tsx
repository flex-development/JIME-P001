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
  const globalProps = props as MutatedProps

  keys = keys || []

  if (globalProps.innerHTML) {
    globalProps.dangerouslySetInnerHTML = { __html: globalProps.innerHTML }

    keys.push('innerHTML')
    keys.push('children')
  }

  if (globalProps.flex) {
    const { flex } = globalProps

    injectClass = isObject(injectClass) ? injectClass : {}
    injectClass[`d-${isString(flex) ? 'inline-' : ''}flex`] = flex

    keys.push('flex')
  }

  if ((globalProps as AnyObject).variant) {
    const { variant } = globalProps as AnyObject

    injectClass = isObject(injectClass) ? injectClass : {}
    injectClass[`${injectClass.btn ? 'btn' : 'bg'}-${variant}`] = variant

    keys.push('variant')
  }

  globalProps.className = classnames(injectClass, globalProps.className)

  return omit(globalProps, uniq(keys)) as Mask
}

export default useMutatedProps
