import { useMutatedProps } from '@system/hooks'
import { MutatedRefProps } from '@system/types'
import { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<header>` element
 * @module components/atoms/Header/Header
 */

/**
 * Renders a `<header>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/header
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Header: FREC<MutatedRefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['header']
  >(props)

  return <header {...mutated} ref={ref} />
})

Header.displayName = 'Header'

Header.defaultProps = {}
