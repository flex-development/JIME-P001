import { GlobalProps, SpacerKey } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { useMutatedProps } from '../hooks'
import { BoxRefAttributes } from './Box'

/**
 * @module lib/elements/Spacer
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/div}
 */

/**
 * {@link Spacer} component properties.
 */
export interface SpacerProps extends GlobalProps {
  /**
   * Key of `scss` `$spacers` map.
   *
   * @default 0
   */
  spacer?: SpacerKey
}

/**
 * {@link Spacer} component properties without the `ref` property.
 */
export type ReflessSpacerProps = PropsWithoutRef<SpacerProps>

/**
 * {@link Spacer} component forward ref properties.
 */
export type SpacerRefProps = ReflessSpacerProps & BoxRefAttributes

/**
 * Renders a `<div>` element with the class `h-spacer-${props.spacer}`.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/div**
 */
export const Spacer: FREC<SpacerRefProps> = forwardRef((props, ref) => {
  const { spacer, ...rest } = props

  const mutatedProps = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['div']
  >(rest, { [`h-spacer-${spacer}`]: true })

  return <div {...mutatedProps} ref={ref} />
})

Spacer.defaultProps = {
  spacer: 0
}
