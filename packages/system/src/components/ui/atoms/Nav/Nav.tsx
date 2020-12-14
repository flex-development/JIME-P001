import { useFlexbox, useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'
import { FlexBoxProps } from '../FlexBox'

/**
 * @file Render a `<nav>` element
 * @module components/ui/atoms/Nav/impl
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
 * Renders a `<nav>` element with the class `nav`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/navs
 * - https://developer.mozilla.org/docs/Web/HTML/Element/nav
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Nav: FREC<NavProps> = forwardRef((props, ref) => {
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

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'nav'>>(rest, {
    [flexbox]: flexbox.length !== 0,
    nav: true,
    'nav-fill': fill,
    'nav-pills': pills,
    'nav-tabs': tabs
  })

  return <animated.nav {...sanitized} ref={ref} />
})

Nav.displayName = 'Nav'

Nav.defaultProps = {
  fill: false,
  pills: false,
  tabs: false
}
