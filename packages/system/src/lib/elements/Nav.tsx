import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
} from 'react'
import {BoxProps} from '.'
import {HTMLElementRefAttributes} from '../declarations'
import {useMutatedProps, useTextContentDictionary} from '../modules/hooks'

/**
 * @module lib/elements/Nav
 * @see {@link https://v5.getbootstrap.com/docs/5.0/components/navs/}
 */

/**
 * {@link Nav} component properties.
 */
export interface NavProps extends BoxProps<HTMLElement> {
  /**
   * Add the class `nav-fill` to create a pills navigation.
   *
   * - https://v5.getbootstrap.com/docs/5.0/components/navs/#fill-and-justify
   *
   * @default false
   */
  fill?: boolean

  /**
   * Add the class `nav-pills` to create a pills navigation.
   *
   * - https://v5.getbootstrap.com/docs/5.0/components/navs/#pills
   *
   * @default false
   */
  pills?: boolean

  /**
   * Add the class `nav-tabs` to create a tabular navigation.
   *
   * - https://v5.getbootstrap.com/docs/5.0/components/navs/#tabs
   *
   * @default false
   */
  tabs?: boolean
}

/**
 * {@link Nav} component properties without the `ref` property.
 */
export type ReflessNavProps = PropsWithoutRef<NavProps>

/**
 * {@link Nav} component forward ref properties.
 */
export type NavRefProps = ReflessNavProps & HTMLElementRefAttributes

/**
 * Renders a `<nav>` element with the class `nav`.
 *
 * - **https://v5.getbootstrap.com/docs/5.0/components/navs/**
 */
export const Nav: FREC<NavRefProps> = forwardRef((props, ref) => {
  const {fill, pills, tabs, ...rest} = props

  const {dictionary, sanitized} = useTextContentDictionary<typeof rest>(
    rest,
    'nav'
  )

  const mutatedProps = useMutatedProps<
    typeof sanitized,
    JSX.IntrinsicElements['nav']
  >(sanitized, {
    ...dictionary,
    'nav-fill': fill,
    'nav-pills': pills,
    'nav-tabs': tabs,
  })

  return <nav {...mutatedProps} ref={ref} />
})

Nav.defaultProps = {
  fill: false,
  pills: false,
  tabs: false,
}
