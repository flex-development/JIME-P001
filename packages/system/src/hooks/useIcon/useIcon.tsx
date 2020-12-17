import { AnyObject } from '@flex-development/json'
import { Icon, IconProps } from '@system/components/ui/atoms/Icon'
import { MutatedProps } from '@system/types'
import classnames from 'classnames'
import { isNull, isUndefined, join, uniq } from 'lodash'
import { useMemo } from 'react'
import { useMemoCompare } from '../useMemoCompare'

/**
 * @file Render icon with props.children
 * @module hooks/useIcon
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 * @see https://reactjs.org/docs/hooks-reference.html#useeffect
 */

export type UseIconProps = {
  children?: MutatedProps['children']
  className?: MutatedProps['className']
  icon?: IconProps
}

/**
 * Renders an `Icon` component with {@param props.children}.
 *
 * If the {@param props.icon.position} isn't defined, the icon will be rendered
 * on the right.
 *
 * @param props - Component properties
 * @param props.children - Inner content
 * @param props.className - Classes to pass to component
 * @param props.icon - Icon component properties
 * @param props.icon.position - String indication where to position icon
 */
export function useIcon<P extends UseIconProps = UseIconProps>(props: P): P {
  const { children, className = '', icon, ...rest } = props

  const _children = useMemoCompare<typeof children>(children)
  const _icon = useMemoCompare<IconProps>(icon || {})
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
      } else if (_children && _icon.position === 'left') {
        _props.children = [component, _children]
      } else {
        _props.children = [_children, component]

        if (['bottom', 'top'].includes(_icon.position ?? '')) {
          _props.className = classnames({
            'd-flex': true,
            'flex-column': _icon.position === 'bottom',
            'flex-column-reverse': _icon.position === 'top'
          })
        }
      }
    }

    // Merge classes and get unique class names
    _props.className = classnames(className, _props.className).trim()
    _props.className = join(uniq(_props.className.split(' ')), ' ').trim()

    // Add additional data attributes
    if (!skip) {
      const { children: _pc } = _props

      _props['data-icon'] = true
      _props['data-icon-only'] = isNull(_pc) || isUndefined(_pc)
      _props['data-position'] = _icon.position
    }

    return _props as P
  }, [_children, _icon, _rest, className])
}
