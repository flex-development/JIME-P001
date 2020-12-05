import { useSanitizedProps } from '@system/hooks'
import { MutatedRefProps } from '@system/types'
import { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<header>` element
 * @module components/atoms/Header/impl
 */

/**
 * Renders a `<header>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/header
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Header: FREC<MutatedRefProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<
    typeof props,
    JSX.IntrinsicElements['header']
  >(props)

  return <header {...sanitized} ref={ref} />
})

Header.displayName = 'Header'

Header.defaultProps = {}
