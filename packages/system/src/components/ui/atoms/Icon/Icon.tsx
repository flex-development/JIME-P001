import { useSanitizedProps } from '@system/hooks'
import { FREC } from '@system/types'
import { isEmpty } from 'lodash'
import { forwardRef } from 'react'
import { Span, SpanProps } from '../Span'

/**
 * @file Render a Material UI icon
 * @module components/ui/atoms/Icon/impl
 */

export interface IconProps extends SpanProps {
  /**
   * If defined, render a Bootstrap icon.
   *
   * - https://icons.getbootstrap.com/#usage
   */
  bi?: string

  /**
   * If true, render a Font Awesome icon.
   *
   * - https://fontawesome.com/
   */
  fa?: string

  /**
   * Get the outlined version of the Material UI icon.
   *
   * - https://material.io/resources/icons/?style=outline
   */
  outlined?: boolean

  /**
   * If rendering inside of another component, this value determines where the
   * `Icon` will be placed.
   *
   * - https://developer.mozilla.org/docs/Web/HTML/Global_attributes/data-*
   */
  position?: 'bottom' | 'left' | 'right' | 'top'
}

/**
 * Displays a Bootstrap, Font Awesome, or Material UI icon.
 *
 * Renders a `<Span>` component with the class `icon`.
 *
 * - https://fontawesome.com/
 * - https://icons.getbootstrap.com
 * - https://material.io/resources/icons
 * - https://developer.mozilla.org/docs/Web/HTML/Element/span
 * - https://developer.mozilla.org/docs/Web/API/HTMLSpanElement
 */
export const Icon: FREC<IconProps> = forwardRef((props, ref) => {
  const { bi, fa, outlined, position, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest, SpanProps>(rest, {
    [`bi-${bi}`]: !isEmpty(bi),
    [`fa-${fa}`]: !isEmpty(fa),
    icon: true,
    'material-icons': !outlined && isEmpty(bi) && isEmpty(fa),
    'material-icons-outlined': outlined && isEmpty(bi) && isEmpty(fa)
  })

  sanitized['aria-hidden'] = rest.children ? rest?.['aria-hidden'] : false
  sanitized['data-position'] = position

  if (!isEmpty(bi)) sanitized['data-bi'] = true

  if (!isEmpty(fa)) sanitized['data-fa'] = true

  if (isEmpty(bi) && isEmpty(fa)) {
    sanitized['data-ligature'] = sanitized.children
    sanitized['data-material'] = true
  }

  return <Span {...sanitized} ref={ref} />
})

Icon.displayName = 'Icon'

Icon.defaultProps = {}
