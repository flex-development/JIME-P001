import { GlobalProps, HTMLElementRefAttributes } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { useMutatedProps } from '../hooks'

/**
 * @module lib/elements/Main
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/main}
 */

/**
 * {@link Main} component properties.
 */
export type MainProps = Omit<GlobalProps, 'icon' | 'size'>

/**
 * {@link Main} component properties without the `ref` property.
 */
export type ReflessMainProps = PropsWithoutRef<MainProps>

/**
 * {@link Main} component forward ref properties.
 */
export type MainRefProps = ReflessMainProps & HTMLElementRefAttributes

/**
 * Renders a `<main>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main**
 */
export const Main: FREC<MainRefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['main']
  >(props)

  return <main {...mutatedProps} ref={ref} />
})

Main.defaultProps = {}
