import { useSanitizedProps } from '@system/hooks'
import { MutatedRefProps } from '@system/types'
import { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<main>` element
 * @module components/atoms/Main/impl
 */

/**
 * Renders a `<main>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/main
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Main: FREC<MutatedRefProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<
    typeof props,
    JSX.IntrinsicElements['main']
  >(props)

  return <main {...sanitized} ref={ref} />
})

Main.displayName = 'Main'

Main.defaultProps = {}
