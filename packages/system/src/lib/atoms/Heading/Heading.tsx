import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { createElement, forwardRef } from 'react'
import type { HeadingProps } from './Heading.props'

/**
 * @file Implementation - Heading
 * @module lib/atoms/Heading/impl
 */

/**
 * Renders a `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, or `<h6>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements
 * - https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 */
export const Heading: FREC<HeadingProps> = forwardRef((props, ref) => {
  const { $size = 1, ...rest } = props

  const sanitized = useSanitizedProps<'h1'>(rest)

  return createElement(`h${$size}`, { ...sanitized, ref })
})

Heading.displayName = 'Heading'

Heading.defaultProps = {}

export const HeadingAnimated: AnimatedFREC<HeadingProps> = a(Heading)
