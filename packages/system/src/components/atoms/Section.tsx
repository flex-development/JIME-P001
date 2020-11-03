import { useMutatedProps } from '@system/hooks'
import { RefProps } from '@system/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<section>` element
 * @module components/atoms/Section
 */

/**
 * Renders a `<section>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section**
 */
export const Section: FREC<RefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['section']
  >(props)

  return <section {...mutated} ref={ref} />
})

Section.displayName = 'Section'

Section.defaultProps = {}
