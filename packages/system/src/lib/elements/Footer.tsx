import { ContentSectionProps, HTMLElementRefAttributes } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { useMutatedProps } from '../hooks'

/**
 * @module lib/elements/Footer
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/footer}
 */

/**
 * {@link Footer} component properties.
 */
export type FooterProps = ContentSectionProps

/**
 * {@link Footer} component properties without the `ref` property.
 */
export type ReflessFooterProps = PropsWithoutRef<FooterProps>

/**
 * {@link Footer} component forward ref properties.
 */
export type FooterRefProps = ReflessFooterProps & HTMLElementRefAttributes

/**
 * Renders a `<footer>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer**
 */
export const Footer: FREC<FooterRefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['footer']
  >(props)

  return <footer {...mutatedProps} ref={ref} />
})

Footer.defaultProps = {}
