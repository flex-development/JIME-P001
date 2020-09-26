import { RefProps } from '@kustomz/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'
import { useMutatedProps } from '../hooks'

/**
 * @file Render a `<main>` element
 * @module lib/elements/Main
 */

/**
 * Renders a `<main>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main**
 */
export const Main: FREC<RefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['main']
  >(props)

  return <main {...mutatedProps} ref={ref} />
})

Main.defaultProps = {}
