import {
  Box,
  Column,
  FlexBox,
  Paragraph,
  Row,
  Span
} from '@system/components/ui/atoms'
import {
  Hero,
  HeroProps,
  PlaylistBar,
  PlaylistBarProps,
  ShopHeader,
  ShopHeaderProps,
  Sidebar,
  SidebarProps
} from '@system/components/ui/organisms'
import { GRID_BREAKPOINTS } from '@system/config'
import { useSlideInOut } from '@system/hooks'
import { TC } from '@system/types'
import { ReactNode, useCallback } from 'react'
import { useSpring } from 'react-spring'
import { useEvent, useMedia } from 'react-use'

/**
 * @file Shop Layout
 * @module components/ui/templates/ShopLayout/impl
 */

export interface ShopLayoutProps {
  /**
   * Component representing the current page.
   */
  children?: ReactNode

  /**
   * Props to pass to the `ShopHeader` component.
   *
   * @default {}
   */
  header?: ShopHeaderProps

  /**
   * Props to pass to the `Hero` component.
   */
  hero?: HeroProps

  /**
   * If true, show loading screen instead of content.
   */
  loading?: boolean

  /**
   * Props to pass to the `PlaylistBar` component.
   *
   * @default {}
   */
  playlistbar?: PlaylistBarProps

  /**
   * Props to pass to the `Sidebar` component.
   *
   * @default {}
   */
  sidebar?: SidebarProps
}

/**
 * Renders the store layout and current page.
 */
export const ShopLayout: TC<ShopLayoutProps> = (props: ShopLayoutProps) => {
  const {
    children,
    header = {} as ShopHeaderProps,
    hero = {} as HeroProps,
    loading = false,
    playlistbar = {} as PlaylistBarProps,
    sidebar = {} as SidebarProps
  } = props

  // The sidebar will be visible by default on large screens
  const breakpoint_lg = useMedia(`(min-width: ${GRID_BREAKPOINTS.lg}px)`, true)

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
      className='shop-layout'
      data-loading={loading}
      data-template={ShopLayout.template_id}
    >
      {(() => {
        if (loading)
          return (
            <Box className='loading-container h-100 w-100' style={loading_a}>
              <FlexBox
                align='center'
                className='h-100'
                direction='column'
                justify='center'
              >
                <Span className='fas fa-spinner fa-spin fa-2x' />
                <Paragraph className='text-bold text-xs text-uppercase' mt={16}>
                  Loading...
                </Paragraph>
              </FlexBox>
            </Box>
          )

        return (
          <>
            <Row gx={0} justify='end'>
              <Column
                className='sidebar-col'
                data-visible={sidebar_a.visible}
                hidden={!breakpoint_lg && !sidebar_a.visible}
                ref={sidebar_a.ref}
                style={sidebar_a.style}
              >
                <Sidebar {...sidebar} />
              </Column>

              <Column className='content-col' mt={0} px={0}>
                <ShopHeader
                  {...header}
                  handleSidebar={sidebar_a.toggle}
                  px={24}
                  py={20}
                />
                <FlexBox direction='column'>
                  <Hero {...hero} />
                  {children}
                </FlexBox>
              </Column>
            </Row>

            <PlaylistBar {...(playlistbar as PlaylistBarProps)} pr={24} />
          </>
        )
      })()}
    </Box>
  )
}

ShopLayout.displayName = 'ShopLayout'

ShopLayout.template_id = 'shop-layout'

ShopLayout.defaultProps = {
  header: {},
  hero: {
    subtitle: 'Kustom made pot head necessities.',
    title: 'Morenas Kustomz'
  },
  playlistbar: {} as PlaylistBarProps,
  sidebar: {}
}
