import { useMutatedProps } from '@kustomz/hooks'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { Span, SpanProps, SpanRefAttributes } from './Span'

/**
 * @file Render a Material UI icon
 * @module lib/atoms/Icon
 */

/**
 * Icon component properties.
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
 * Icon component properties without the `ref` property.
 */
export type ReflessIconProps = PropsWithoutRef<IconProps>

/**
 * {@link Icon} component forward ref properties.
 */
export type IconRefProps = ReflessIconProps & SpanRefAttributes

/**
 * Renders a `<Span>` component as a Material UI icon.
 *
 * - **https://material.io/resources/icons/?style=outline**
 * - **https://material.io/resources/icons/?style=solid**
 */
export const Icon: FREC<IconRefProps> = forwardRef((props, ref) => {
  const { outlined, position, ...rest } = props

  const mutatedProps = useMutatedProps<typeof rest, SpanProps>(rest, {
    icon: true,
    'material-icons': !outlined,
    'material-icons-outlined': outlined
  })

  mutatedProps['aria-hidden'] = rest.children ? rest?.['aria-hidden'] : false
  mutatedProps['data-ligature'] = mutatedProps.children
  mutatedProps['data-position'] = position

  return <Span {...mutatedProps} ref={ref} />
})

Icon.defaultProps = {
  outlined: true
}
