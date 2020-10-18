import { useMutatedProps } from '@system/hooks'
import { HTMLElementRefAttributes, MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'

/**
 * @file Render a `<nav>` element
 * @module lib/atoms/Nav
 */

export interface NavProps extends MutatedProps {
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
 * Nav component properties without the `ref` property.
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
  const { fill, pills, tabs, ...rest } = props

  const mutated = useMutatedProps<typeof rest, JSX.IntrinsicElements['nav']>(
    rest,
    {
      nav: true,
      'nav-fill': fill,
      'nav-pills': pills,
      'nav-tabs': tabs
    }
  )

  return <nav {...mutated} ref={ref} />
})

Nav.displayName = 'Nav'

Nav.defaultProps = {
  fill: false,
  pills: false,
  tabs: false
}
