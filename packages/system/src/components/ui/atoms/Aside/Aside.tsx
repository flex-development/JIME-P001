import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedRefProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render an `<aside>` element
 * @module components/ui/atoms/Aside/impl
 */

/**
 * Renders an `<aside>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/aside
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Aside: FREC<MutatedRefProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'aside'>>(
    props
  )

  return <animated.aside {...sanitized} ref={ref} />
})

Aside.displayName = 'Aside'

Aside.defaultProps = {}
