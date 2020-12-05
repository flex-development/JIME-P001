import { ThemeColor } from '@flex-development/kustomzcore'
import { useSanitizedProps } from '@system/hooks'
import { MutatedVoidElementProps } from '@system/types'
import { omit } from 'lodash'
import {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a `<hr>` element
 * @module components/atoms/Divider/impl
 */

export interface DividerProps extends MutatedVoidElementProps<HTMLHRElement> {
  /**
   * Apply a theme color.
   */
  color?: ThemeColor | 'black' | 'white'
}

/**
 * Divider component properties without the `ref` property.
 */
export type ReflessDividerProps = PropsWithoutRef<DividerProps>

/**
 * Ref attributes for `<hr>` elements.
 */
export type DividerRefAttributes = RefAttributes<HTMLHRElement>

/**
 * {@link Divider} component forward ref properties.
 */
export type DividerRefProps = ReflessDividerProps & DividerRefAttributes

/**
 * Renders a `<hr>` element with the class `divider`.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/hr
 * - https://developer.mozilla.org/docs/Web/API/HTMLHRElement
 */
export const Divider: FREC<DividerProps> = forwardRef((props, ref) => {
  const { color, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest, JSX.IntrinsicElements['hr']>(
    rest,
    { divider: true, [`c-${color}`]: color }
  )

  return <hr {...omit(sanitized, ['children'])} ref={ref} />
})

Divider.displayName = 'Divider'

Divider.defaultProps = {}
