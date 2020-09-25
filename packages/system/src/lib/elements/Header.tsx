import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
} from 'react'
import {ContentSectionProps, HTMLElementRefAttributes} from '../declarations'
import {useMutatedProps} from '../modules/hooks'

/**
 * @module lib/elements/Header
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/header}
 */

/**
 * {@link Header} component properties.
 */
export type HeaderProps = ContentSectionProps

/**
 * {@link Header} component properties without the `ref` property.
 */
export type ReflessHeaderProps = PropsWithoutRef<HeaderProps>

/**
 * {@link Header} component forward ref properties.
 */
export type HeaderRefProps = ReflessHeaderProps & HTMLElementRefAttributes

/**
 * Renders a `<header>` element.
 *
 * - **https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header**
 */
export const Header: FREC<HeaderRefProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['header']
  >(props)

  return <header {...mutatedProps} ref={ref} />
})

Header.defaultProps = {}
