import { useSlideInOut } from '@system/hooks/useSlideInOut'
import { Box } from '@system/lib/atoms/Box'
import { Span } from '@system/lib/atoms/Span'
import { SVG } from '@system/lib/atoms/SVG'
import { Hero, HeroProps } from '@system/lib/organisms/Hero'
import {
  PlaylistBar,
  PlaylistBarProps
} from '@system/lib/organisms/PlaylistBar'
import { ShopHeader, ShopHeaderProps } from '@system/lib/organisms/ShopHeader'
import { Sidebar, SidebarProps } from '@system/lib/organisms/Sidebar'
import { GridBreakpoints, TC } from '@system/types'
import { useCallback } from 'react'
import useEvent from 'react-use/useEvent'
import useMedia from 'react-use/useMedia'
import { LayoutProps } from './Layout.props'

/**
 * @file Implementation - Layout
 * @module lib/templates/Layout/impl
 */

/**
 * Renders the store layout and current page.
 *
 * Renders a `Box` component with the class `layout`.
 */
export const Layout: TC<LayoutProps> = (props: LayoutProps) => {
  const {
    children,
    header = {} as ShopHeaderProps,
    hero = {} as HeroProps,
    loading = false,
    playlistbar = {} as PlaylistBarProps,
    sidebar = {} as SidebarProps
  } = props

  // The sidebar will be visible by default on large screens
  const breakpoint_lg = useMedia(`(min-width: ${GridBreakpoints.lg}px)`, true)

  // Animate sidebar visibility
  const sidebar_a = useSlideInOut<HTMLDivElement>(breakpoint_lg)

  /**
   * The sidebar will be closed automatically when the window width is less than
   * or equal to the `GRID_BREAKPOINTS.lg` breakpoint.
   */
  const onResize = () => sidebar_a.setVisibility(breakpoint_lg)

  // Attach `onResize` fn to window resize event
  useEvent('resize', useCallback(onResize, [breakpoint_lg, sidebar_a]))

  return (
    <Box
      className='layout'
      data-loading={loading}
      data-template={Layout.template_id}
    >
      <Box className='loading-container'>
        <SVG $loading className='loading-container-icon' />
        <Span className='loading-container-text'>Loading</Span>
      </Box>
      <ShopHeader {...header} handleSidebar={sidebar_a.toggle} />

      <Box
        className='layout-grid'
        data-sidebar={sidebar_a.visible || undefined}
      >
        <Box
          className='sidebar-col'
          data-visible={sidebar_a.visible}
          hidden={!breakpoint_lg && !sidebar_a.visible}
          ref={sidebar_a.ref}
          style={sidebar_a.style}
        >
          <Sidebar {...sidebar} />
        </Box>

        <Box className='content-col'>
          <Hero {...hero} />
          {children}
        </Box>
      </Box>

      <PlaylistBar {...playlistbar} />
    </Box>
  )
}

Layout.displayName = 'Layout'

Layout.template_id = 'layout'

Layout.defaultProps = {
  header: {},
  hero: {
    subtitle: 'Kustom made pot head necessities.',
    title: 'Morenas Kustomz'
  },
  playlistbar: {} as PlaylistBarProps,
  sidebar: {}
}
