import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'
import { IconProps } from '../Icon'

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
 * Renders a `<p>` element.
 *
 * - https://v5.getbootstrap.com/docs/5.0/utilities/text
 * - https://developer.mozilla.org/docs/Web/HTML/Element/p
 * - https://developer.mozilla.org/docs/Web/API/HTMLParagraphElement
 */
export const Paragraph: FREC<ParagraphProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'p'>>(props)
  return <animated.p {...sanitized} ref={ref} />
})

Paragraph.displayName = 'Paragraph'

Paragraph.defaultProps = {}
