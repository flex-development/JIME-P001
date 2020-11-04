import { useMutatedProps } from '@system/hooks'
import { MutatedRefProps } from '@system/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<section>` element
 * @module components/atoms/Section
 */

/**
 * Renders a `<section>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/section
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Section: FREC<MutatedRefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['section']
  >(props)

  return <section {...mutated} ref={ref} />
})

Section.displayName = 'Section'

Section.defaultProps = {}
