import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

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
export const Header: FREC<MutatedProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'header'>>(
    props
  )

  return <animated.header {...sanitized} ref={ref} />
})

Header.displayName = 'Header'

Header.defaultProps = {}
