import { RefProps } from '@kustomz/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'
import { useMutatedProps } from '../hooks'

/**
 * @file Render a `<section>` element
 * @module lib/elements/Section
 */

/**
 * Renders a `<section>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section**
 */
export const Section: FREC<RefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['section']
  >(props)

  return <section {...mutatedProps} ref={ref} />
})

Section.defaultProps = {}
