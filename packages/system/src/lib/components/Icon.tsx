import { omit } from 'lodash'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { Span, SpanProps, SpanRefAttributes } from '../elements'
import { useMutatedProps, useTextUtilities } from '../hooks'

/**
 * @module lib/elements/Icon
 * @see {@link https://material.io/resources/icons/?style=outline}
 * @see {@link https://fontawesome.com/icons?d=gallery&m=free}
 */

/**
 * {@link Icon} component properties.
 */
export interface IconProps extends SpanProps {
  /**
   * If rendering inside of another component, this value determines where the
   * `Icon` will be placed.
   *
   * https://developer.mozilla.org/docs/Web/HTML/Global_attributes/data-*
   */
  position?: 'bottom' | 'left' | 'right' | 'top'
}

/**
 * {@link Icon} component properties without the `ref` property.
 */
export type ReflessIconProps = PropsWithoutRef<IconProps>

/**
 * {@link Icon} component forward ref properties.
 */
export type IconRefProps = ReflessIconProps & SpanRefAttributes

/**
 * Renders a `<Span>` component with the class `icon`. A Material UI or Font
 * Awesome icon can be rendered.
 *
 * - **https://material.io/resources/icons/?style=outline**
 * - **https://fontawesome.com/icons?d=gallery&m=free**
 */
export const Icon: FREC<IconRefProps> = forwardRef((props, ref) => {
  const { position, ...rest } = props

  const fontAwesomeIcon = rest.className?.includes('fa')

  const { dictionary, sanitized } = useTextUtilities<typeof rest>(
    omit(rest, ['icon']),
    'icon'
  )

  const mutatedProps = useMutatedProps<typeof sanitized, SpanProps>(sanitized, {
    ...dictionary,
    'material-icons-outlined': !fontAwesomeIcon
  })

  mutatedProps['aria-hidden'] = rest.children ? rest?.['aria-hidden'] : false
  mutatedProps['data-position'] = position

  if (!fontAwesomeIcon) mutatedProps['data-ligature'] = mutatedProps.children

  return <Span {...mutatedProps} ref={ref} />
})
