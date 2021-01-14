import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { HeaderProps } from './Header.props'

/**
 * @file Implementation - Header
 * @module lib/atoms/Header/impl
 */

/**
 * Renders a `<header>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/header
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Header: FREC<HeaderProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'header'>(props)

  return <a.header {...sanitized} ref={ref} />
})

Header.displayName = 'Header'

Header.defaultProps = {}
