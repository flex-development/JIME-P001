import { useMutatedProps } from '@kustomz/hooks'
import { RefProps } from '@kustomz/types'
import React, { forwardRef, ForwardRefExoticComponent as FREC } from 'react'

/**
 * @file Render a `<header>` element
 * @module lib/elements/Header
 */

/**
 * Renders a `<header>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header**
 */
export const Header: FREC<RefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['header']
  >(props)

  return <header {...mutatedProps} ref={ref} />
})

Header.defaultProps = {}
