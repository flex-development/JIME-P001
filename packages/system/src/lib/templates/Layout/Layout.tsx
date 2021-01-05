import { useSlideInOut } from '@system/hooks'
import { Box, Span, SVG } from '@system/lib/atoms'
import {
  Hero,
  HeroProps,
  PlaylistBar,
  PlaylistBarProps,
  ShopHeader,
  ShopHeaderProps,
  Sidebar,
  SidebarProps
} from '@system/lib/organisms'
import { GridBreakpoints, TC } from '@system/types'
import { useCallback } from 'react'
import { useSpring } from 'react-spring'
import { useEvent, useMedia } from 'react-use'
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

  // Animate loading container in/out
  const loading_a = useSpring({ opacity: loading ? 1 : 0 })

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
      {(() => {
        if (loading)
          return (
            <Box className='loading-container' style={loading_a}>
              <SVG $loading className='loading-container-icon' />
              <Span className='loading-container-text'>Loading</Span>
            </Box>
          )

        return (
          <>
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
          </>
        )
      })()}
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
