import { useMutatedProps } from '@system/hooks'
import { MutatedRefProps } from '@system/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<main>` element
 * @module components/atoms/Main/Main
 */

/**
 * Renders a `<main>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/main
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Main: FREC<MutatedRefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<typeof props, JSX.IntrinsicElements['main']>(
    props
  )

  return <main {...mutated} ref={ref} />
})

Main.displayName = 'Main'

Main.defaultProps = {}
