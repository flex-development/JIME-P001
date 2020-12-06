import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render a `<footer>` element
 * @module components/atoms/Footer/impl
 */

/**
 * Renders a `<footer>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/footer
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Footer: FREC<MutatedProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'footer'>>(
    props
  )

  return <animated.footer {...sanitized} ref={ref} />
})

Footer.displayName = 'Footer'

Footer.defaultProps = {}
