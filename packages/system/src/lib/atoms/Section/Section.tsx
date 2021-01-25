import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { SectionProps } from './Section.props'

/**
 * @file Implementation - Section
 * @module lib/atoms/Section/impl
 */

/**
 * Renders a `<section>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/section
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Section: FREC<SectionProps> = forwardRef((props, ref) => {
  const { $content, ...rest } = props

  const sanitized = useSanitizedProps<'section'>(rest, {
    'content-section': $content
  })

  return <section {...sanitized} ref={ref} />
})

Section.displayName = 'Section'

Section.defaultProps = {}

export const SectionAnimated: AnimatedFREC<SectionProps> = a(Section)

SectionAnimated.displayName = 'SectionAnimated'

SectionAnimated.defaultProps = Section.defaultProps
