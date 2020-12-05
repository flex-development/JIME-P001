import { useSanitizedProps } from '@system/hooks'
import { MutatedRefProps } from '@system/types'
import { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

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
export const Footer: FREC<MutatedRefProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<
    typeof props,
    JSX.IntrinsicElements['footer']
  >(props)

  return <footer {...sanitized} ref={ref} />
})

Footer.displayName = 'Footer'

Footer.defaultProps = {}
