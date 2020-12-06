import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render a `<section>` element
 * @module components/atoms/Section/impl
 */

/**
 * Renders a `<section>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/section
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Section: FREC<MutatedProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'section'>>(
    props
  )

  return <animated.section {...sanitized} ref={ref} />
})

Section.displayName = 'Section'

Section.defaultProps = {}
