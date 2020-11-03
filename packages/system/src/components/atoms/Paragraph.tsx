import { useIcon, useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { IconProps } from './Icon'

/**
 * @file Render a `<p>` element
 * @module components/atoms/Paragraph
 */

export interface ParagraphProps extends MutatedProps<HTMLParagraphElement> {
  /**
   * Icon to render beside the element text.
   */
  icon?: IconProps
}

/**
 * Paragraph component properties without the `ref` property.
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
  const withIcon = useIcon<HTMLParagraphElement, ParagraphProps>(props)

  const mutated = useMutatedProps<typeof withIcon, JSX.IntrinsicElements['p']>(
    withIcon
  )

  return <p {...mutated} ref={ref} />
})

Paragraph.displayName = 'Paragraph'

Paragraph.defaultProps = {}
