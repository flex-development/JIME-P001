import { useFlexbox, useMutatedProps } from '@system/hooks'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { BoxRefAttributes } from './Box'
import { FlexBoxProps } from './FlexBox'

/**
 * @file Render a `<nav>` element
 * @module components/atoms/Nav
 */

export interface NavProps extends FlexBoxProps {
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
export type NavRefProps = ReflessNavProps & BoxRefAttributes

/**
 * Renders a `<nav>` element with the class `nav`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/navs
 * - https://developer.mozilla.org/docs/Web/HTML/Element/nav
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Nav: FREC<NavRefProps> = forwardRef((props, ref) => {
  const {
    align,
    direction,
    display,
    fill,
    justify,
    pills,
    tabs,
    wrap,
    ...rest
  } = props

  const flexbox = useFlexbox({
    align,
    direction,
    display,
    justify,
    wrap
  })

  const mutated = useMutatedProps<typeof rest, JSX.IntrinsicElements['nav']>(
    rest,
    {
      [flexbox]: flexbox.length !== 0,
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
