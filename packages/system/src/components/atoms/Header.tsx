import { useMutatedProps } from '@system/hooks'
import { RefProps } from '@system/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<header>` element
 * @module components/atoms/Header
 */

/**
 * Renders a `<header>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header**
 */
export const Header: FREC<RefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['header']
  >(props)

  return <header {...mutated} ref={ref} />
})

Header.displayName = 'Header'

Header.defaultProps = {}
