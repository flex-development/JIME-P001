import { HTMLElementRefAttributes, MutatedProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { useMutatedProps } from '../hooks'

/**
 * @file Renders an `<aside>` element
 * @module lib/elements/Aside
 */

/**
 * {@link Aside} component properties.
 */
export type AsideProps = MutatedProps

/**
 * {@link Aside} component properties without the `ref` property.
 */
export type ReflessAsideProps = PropsWithoutRef<AsideProps>

/**
 * {@link Aside} component forward ref properties.
 */
export type AsideRefProps = ReflessAsideProps & HTMLElementRefAttributes

/**
 * Renders an `<aside>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside**
 */
export const Aside: FREC<AsideRefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['aside']
  >(props)

  return <aside {...mutatedProps} ref={ref} />
})

Aside.defaultProps = {}
