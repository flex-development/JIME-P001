import { AnyObject } from '@flex-development/kustomtypez'
import { GlobalProps } from '@kustomz/types'
import classnames from 'classnames'
import { isNull, isUndefined, omit } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Icon, IconProps } from '../components/Icon'

/**
 * @file Render icon with props.children
 * @module hooks/useIcon
 *
 * @see {@link https://reactjs.org/docs/hooks-reference.html#usestate}
 * @see {@link https://reactjs.org/docs/hooks-reference.html#useeffect}
 */

/**
 * Renders an `Icon` component with {@param props.children}.
 *
 * If the {@param props.icon.position} isn't defined, the icon will be rendered
 * on the right.
 *
 * @param props - Component properties
 * @param props.children - Inner content
 * @param props.icon - Icon component properties
 * @param props.icon.position - String indication where to position icon
 */
export const useIcon = (props: GlobalProps): GlobalProps => {
  const {
    children,
    className: initialClassName = '',
    icon: initialIcon
  } = props as AnyObject

  const [className, setClassName] = useState(initialClassName)
  const [skip] = useState(!initialIcon)
  const [dataAttrs, setDataAttrs] = useState<Record<string, any>>({})
  const [mutatedChildren, setMutatedChildren] = useState(children)
  const [icon] = useState(JSON.stringify(initialIcon || ''))

  useEffect(() => {
    // Skip hook logic
    if (skip) return

    // Parse icon props
    const iconParsed: IconProps = JSON.parse(icon)

    // Get icon component
    const component: JSX.Element = <Icon {...iconParsed} key='icon' />

    // Position icon
    const { position } = iconParsed

    if (!children) {
      setMutatedChildren(component)
    } else if (position === 'left') {
      setMutatedChildren([component, children])
    } else {
      setMutatedChildren([children, component])

      if (['bottom', 'top'].includes(position ?? '')) {
        setClassName(classes => {
          return classnames({
            [`${classes}`]: true,
            'd-flex': true,
            'flex-column': position === 'bottom',
            'flex-column-reverse': position === 'top'
          })
        })
      }
    }

    // Set data attributes
    setDataAttrs({
      'data-icon': true,
      'data-icon-only': isNull(children) || isUndefined(children)
    })
  }, [children, icon, skip])

  return {
    ...omit(props, ['icon']),
    ...dataAttrs,
    children: mutatedChildren,
    className
  }
}
