import { useIcon, useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { IconProps } from '../Icon/Icon'

/**
 * @file Render a `<p>` element
 * @module components/atoms/Paragraph/impl
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
 * - https://v5.getbootstrap.com/docs/5.0/utilities/text
 * - https://developer.mozilla.org/docs/Web/HTML/Element/p
 * - https://developer.mozilla.org/docs/Web/API/HTMLParagraphElement
 */
export const Paragraph: FREC<ParagraphRefProps> = forwardRef((props, ref) => {
  const withIcon = useIcon<ParagraphProps>(props)

  const mutated = useMutatedProps<typeof withIcon, JSX.IntrinsicElements['p']>(
    withIcon
  )

  return <p {...mutated} ref={ref} />
})

Paragraph.displayName = 'Paragraph'

Paragraph.defaultProps = {}
