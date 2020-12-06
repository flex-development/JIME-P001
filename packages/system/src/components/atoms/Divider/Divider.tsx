import { ThemeColor } from '@flex-development/kustomzcore'
import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedVoidElementProps } from '@system/types'
import { omit } from 'lodash'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

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
 * Renders a `<hr>` element with the class `divider`.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/hr
 * - https://developer.mozilla.org/docs/Web/API/HTMLHRElement
 */
export const Divider: FREC<DividerProps> = forwardRef((props, ref) => {
  const { color, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'hr'>>(rest, {
    divider: true,
    [`c-${color}`]: color
  })

  return <animated.hr {...omit(sanitized, ['children'])} ref={ref} />
})

Divider.displayName = 'Divider'

Divider.defaultProps = {}
