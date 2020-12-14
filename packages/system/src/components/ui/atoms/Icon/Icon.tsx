import { useSanitizedProps } from '@system/hooks'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { Span, SpanProps } from '../Span'

/**
 * @file Render a Material UI icon
 * @module components/ui/atoms/Icon/impl
 */

export interface IconProps extends SpanProps {
  /**
   * Get the outlined version of the Material UI icon.
   *
   * See: https://material.io/resources/icons/?style=outline
   *
   * @default true
   */
  outlined?: boolean

  /**
   * If rendering inside of another component, this value determines where the
   * `Icon` will be placed.
   *
   * See: https://developer.mozilla.org/docs/Web/HTML/Global_attributes/data-*
   */
  position?: 'bottom' | 'left' | 'right' | 'top'
}

/**
 * Renders a `<Span>` component as a Material UI icon.
 *
 * - https://material.io/resources/icons/?style=outline
 * - https://material.io/resources/icons/?style=solid
 * - https://developer.mozilla.org/docs/Web/HTML/Element/span
 * - https://developer.mozilla.org/docs/Web/API/HTMLSpanElement
 */
export const Icon: FREC<IconProps> = forwardRef((props, ref) => {
  const { outlined, position, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest, SpanProps>(rest, {
    icon: true,
    'material-icons': !outlined,
    'material-icons-outlined': outlined
  })

  sanitized['aria-hidden'] = rest.children ? rest?.['aria-hidden'] : false
  sanitized['data-ligature'] = sanitized.children
  sanitized['data-position'] = position

  return <Span {...sanitized} ref={ref} />
})

Icon.displayName = 'Icon'

Icon.defaultProps = {
  outlined: true
}
