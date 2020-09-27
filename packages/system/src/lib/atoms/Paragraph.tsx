import { useMutatedProps } from '@kustomz/hooks'
import { MutatedProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a `<p>` element
 * @module lib/elements/Paragraph
 */

/**
 * {@link Paragraph} component properties.
 */
export type ParagraphProps = MutatedProps<HTMLParagraphElement>

/**
 * {@link Paragraph} component properties without the `ref` property.
 */
export type ReflessParagraphProps = PropsWithoutRef<ParagraphProps>

/**
 * Ref attributes for `<p>` elements.
 */
export type ParagraphRefAttributes = RefAttributes<HTMLParagraphElement>

/**
 * {@link Paragraph} component forward ref properties.
 */
export type ParagraphRefProps = ReflessParagraphProps & ParagraphRefAttributes

/**
 * Renders a `<p>` element.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/p**
 * - **https://v5.getbootstrap.com/docs/5.0/utilities/text/**
 */
export const Paragraph: FREC<ParagraphRefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['p']
  >(props)

  return <p {...mutatedProps} ref={ref} />
})

Paragraph.defaultProps = {}
