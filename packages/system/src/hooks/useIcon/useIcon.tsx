import { AnyObject } from '@flex-development/json'
import { Icon, IconProps } from '@system/lib/atoms/Icon'
import { ComponentPropsBase } from '@system/types'
import classnames from 'classnames'
import { join, uniq } from 'lodash'
import { useMemo } from 'react'
import { useMemoCompare } from '../useMemoCompare'

/**
 * @file Implementation - useIcon
 * @module hooks/useIcon/impl
 */

export type UseIconProps = {
  $icon?: IconProps
  children?: ComponentPropsBase['children']
  className?: ComponentPropsBase['className']
}

/**
 * Renders an `Icon` component with {@param props.children}.
 *
 * If the {@param props.$icon.position} isn't defined, the icon will be rendered
 * on the right.
 *
 * @param props - Component properties
 * @param props.$icon - Icon component properties
 * @param props.$icon.position - String indication where to position icon
 * @param props.children - Inner content
 * @param props.className - Classes to pass to component
 */
export function useIcon<P extends UseIconProps = UseIconProps>(props: P): P {
  const { $icon, children, className = '', ...rest } = props

  const _children = useMemoCompare<typeof children>(children)
  const _icon = useMemoCompare<IconProps>($icon || {})
  const _rest = useMemoCompare<typeof rest>(rest)

  return useMemo<P>(() => {
    // Logic will be skipped if icon is undefined or empty object
    const skip = !Object.keys(_icon).length

    // Initialize new props
    const _props: AnyObject = { ..._rest, children: _children }

    // Update children
    if (!skip) {
      // Get icon component
      const component: JSX.Element = <Icon {..._icon} key='icon' />

      // Update component children
      if (!_children) {
        _props.children = [component]
      } else if (_children && _icon['data-position'] === 'left') {
        _props.children = [component, _children]
      } else {
        _props.children = [_children, component]

        if (['bottom', 'top'].includes(_icon['data-position'] ?? '')) {
          _props.className = classnames({
            'd-flex': true,
            'flex-column': _icon['data-position'] === 'bottom',
            'flex-column-reverse': _icon['data-position'] === 'top'
          })
        }
      }
    }

    // Merge classes and get unique class names
    _props.className = classnames(className, _props.className).trim()
    _props.className = join(uniq(_props.className.split(' ')), ' ').trim()

    // Add additional data attributes
    if (!skip) {
      _props['data-icon'] = true
      _props['data-position'] = _icon['data-position']
    }

    return _props as P
  }, [_children, _icon, _rest, className])
}
