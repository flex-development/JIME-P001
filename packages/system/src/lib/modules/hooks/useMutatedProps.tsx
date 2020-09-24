import { AnyObject } from '@flex-development/kustomtypez'
import classnames from 'classnames'
import { ClassValue } from 'classnames/types'
import { isObject, isString, omit, uniq } from 'lodash'
import { HTMLAttributes } from 'react'
import { GlobalProps } from '../../declarations'
import { useContainer } from './useContainer'
import { useIcon } from './useIcon'

/**
 * @file Add global mutations to incoming props
 * @module hooks/useMutatedProps
 */

/**
 * Adds global mutations to the incoming component properties.
 *
 * Mutations (in order, if props are defined):
 *
 * - {@param props.icon} will be used to render an {@link Icon} (if defined)
 * - {@param props.children} will wrapped in a {@link Container} component
 * - {@param props.innerHTML} will be converted into `dangerouslySetInnerHTML`
 * - {@param props.flex} (if defined) will be used to update flexbox classes
 * - {@param props.variant} (if defined) will be used to update the `bg-` class
 * - {@param inject} will be passed to `classnames` function
 * - Keys specified in {@param keys} will be removed {@param props}
 *
 * @param props - Component properties
 * @param props.children - Component children
 * @param props.flex - Append flexbox classes
 * @param props.icon - Icon component properties
 * @param props.variant - Append `bg-` classes
 * @param inject - Classes to inject before {@param props.className}
 * @param keys - Array of keys to remove from {@param props}
 */
export function useMutatedProps<
  T1 = GlobalProps,
  Mask = HTMLAttributes<HTMLElement>
>(props: T1, injectClass?: ClassValue, keys?: string[]): Mask {
  const globalProps = props as GlobalProps

  const withIcon = useIcon(globalProps)
  const withContainer = useContainer(withIcon)

  keys = keys || []

  if (withContainer.innerHTML) {
    withContainer.dangerouslySetInnerHTML = { __html: withContainer.innerHTML }

    keys.push('innerHTML')
    keys.push('children')
  }

  if (withContainer.flex) {
    const { flex } = withContainer

    injectClass = isObject(injectClass) ? injectClass : {}
    injectClass[`d-${isString(flex) ? 'inline-' : ''}flex`] = flex

    keys.push('flex')
  }

  if ((withContainer as AnyObject).variant) {
    const { variant } = withContainer as AnyObject

    injectClass = isObject(injectClass) ? injectClass : {}
    injectClass[`${injectClass.btn ? 'btn' : 'bg'}-${variant}`] = variant

    keys.push('variant')
  }

  withContainer.className = classnames(injectClass, withContainer.className)

  const mutatedProps = {
    ...withContainer,
    children: globalProps.icon ? withIcon.children : withContainer.children
  }

  return omit(mutatedProps, uniq(keys)) as Mask
}

export default useMutatedProps
