import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { NavProps } from './Nav.props'

/**
 * @file Implementation - Nav
 * @module lib/atoms/Nav/impl
 */

/**
 * Renders a `<nav>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/nav
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Nav: FREC<NavProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'nav'>(props)
  return <nav {...sanitized} ref={ref} />
})

Nav.displayName = 'Nav'

Nav.defaultProps = {}

export const NavAnimated: AnimatedFREC<NavProps> = a(Nav)

NavAnimated.displayName = 'NavAnimated'

NavAnimated.defaultProps = Nav.defaultProps
