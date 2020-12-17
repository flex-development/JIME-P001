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
   * If defined, render a Material Icon.
   *
   * - https://material.io/resources/icons
   */
  mat?: string

  /**
   * If rendering a Material Icon, add the class `material-icons-outlined`
   * instead of `material-icons`.
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
 */
export const Icon: FREC<IconProps> = forwardRef((props, ref) => {
  const { bi, mat, outlined, position, ...rest } = props

  const _bi = !isEmpty(bi)
  const _mat = !isEmpty(mat)

  const boostrap = _bi && !_mat
  const material = _mat && !_bi

  const sanitized = useSanitizedProps<typeof rest, SpanProps>(rest, {
    [`bi-${bi}`]: boostrap,
    icon: true,
    'material-icons': material && !outlined,
    'material-icons-outlined': material && outlined
  })

  sanitized['aria-hidden'] = rest.children ? rest?.['aria-hidden'] : false
  sanitized['data-position'] = position

  if (boostrap) sanitized['data-bi'] = true

  if (material) {
    sanitized['children'] = mat

    sanitized['data-ligature'] = sanitized['children']
    sanitized['data-material'] = true
  }

  return <Span {...sanitized} ref={ref} />
})

Icon.displayName = 'Icon'

Icon.defaultProps = {}
