import { useMutatedProps } from '@system/hooks'
import { RefProps } from '@system/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<main>` element
 * @module lib/atoms/Main
 */

/**
 * Renders a `<main>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main**
 */
export const Main: FREC<RefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<typeof props, JSX.IntrinsicElements['main']>(
    props
  )

  return <main {...mutated} ref={ref} />
})

Main.displayName = 'Main'

Main.defaultProps = {}
