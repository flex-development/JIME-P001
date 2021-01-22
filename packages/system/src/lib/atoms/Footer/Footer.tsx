import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { FREC } from '@system/types'
import { forwardRef } from 'react'
import type { FooterProps } from './Footer.props'

/**
 * @file Implementation - Footer
 * @module lib/atoms/Footer/impl
 */

/**
 * Renders a `<footer>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/footer
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Footer: FREC<FooterProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'footer'>(props)

  return <a.footer {...sanitized} ref={ref} />
})

Footer.displayName = 'Footer'

Footer.defaultProps = {}
