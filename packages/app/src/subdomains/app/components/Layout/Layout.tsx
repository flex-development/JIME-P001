import type { BoxProps } from '@components/atoms/Box'
import { Box, BoxAnimated } from '@components/atoms/Box'
import { Span } from '@components/atoms/Span'
import { SVG } from '@components/atoms/SVG'
import { Hero } from '@components/organisms/Hero'
import { PlaylistBar } from '@components/organisms/PlaylistBar'
import type { ShopHeaderProps } from '@components/organisms/ShopHeader'
import { ShopHeader } from '@components/organisms/ShopHeader'
import { Sidebar } from '@components/organisms/Sidebar'
import { GridBreakpoints } from '@flex-development/kustomzdesign/types'
import { useSlideInOut } from '@hooks/useSlideInOut'
import type { AnimatedProps } from '@react-spring/web'
import { useWebFontLoader } from '@subdomains/app/hooks/useWebFontLoader'
import type { IPageProps, PageComponent } from '@subdomains/app/types'
import Head from 'next/head'
import { FC, useCallback, useMemo } from 'react'
import useEvent from 'react-use/useEvent'
import useMedia from 'react-use/useMedia'
import UAParser from 'ua-parser-js'

/**
 * @file Implementation - Layout
 * @module subdomains/app/components/Layout/impl
 */

export interface LayoutProps {
  /**
   * The current Next.js page component being rendered.
   */
  page: PageComponent

  /**
   * Props from Next.js data-fetching methods.
   */
  pageProps: IPageProps
}

/**
 * Renders the store layout and current page.
 *
 * @param props - Component properties
 * @param props.page - Next.js page component
 * @param props.pageProps - Props from Next.js data-fetching methods
 * @param props.pageProps.layout - `PlaylistBar` and `Sidebar` data
 */
export const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const { page: Component, pageProps } = props

  // Load Web Fonts
  const webfonts = useWebFontLoader({ typekit: { id: 'oee3tpl' } })

  /**
   * Redirects the user to the search page with their search {@param term}.
   *
   * @param term - User search query
   * @param event - `SearchBar` event
   */
  const handleSearch: ShopHeaderProps['handleSearch'] = (term, event) => {
    event.preventDefault()
    window.location.href = `/search?term=${term}`
  }

  /* Callback version of `handleSearch` */
  const handleSearchCB = useCallback(handleSearch, [])

  // GridBreakpoints.lg media query
  const min_width_lg_query = `(min-width: ${GridBreakpoints.lg}px)`

  // Parse user agent to get device type
  const device = useMemo<string | undefined>(() => {
    return new UAParser(pageProps?.ua ?? '').getDevice().type
  }, [pageProps?.ua])

  // The sidebar will be visible by default on large screens
  const breakpoint_lg = useMedia(min_width_lg_query, !device)

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
    <>
      <Head>
        {/* Viewport for responsive web design */}
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,viewport-fit=cover'
        />
      </Head>

      <Box
        className='layout'
        data-loading={!webfonts || typeof window === 'undefined'}
      >
        <ShopHeader
          handleSidebar={sidebar_a.toggle}
          handleSearch={handleSearchCB}
        />

        <Box
          className='layout-grid'
          data-sidebar={sidebar_a.visible || undefined}
        >
          <BoxAnimated
            className='sidebar-col'
            data-visible={sidebar_a.visible}
            ref={sidebar_a.ref}
            style={sidebar_a.style as AnimatedProps<BoxProps>['style']}
          >
            <Sidebar {...pageProps.layout.sidebar} />
          </BoxAnimated>

          <Box className='content-col'>
            <Hero
              subtitle='Kustom made pot head necessities.'
              title="Morena's Kustomz"
            />
            <Component {...pageProps} />
          </Box>
        </Box>

        <PlaylistBar songs={pageProps.layout.playlist.tracks} />
      </Box>

      <Box className='loading-container'>
        <SVG $loading className='loading-container-icon' />
        <Span className='loading-container-text'>Loading</Span>
      </Box>
    </>
  )
}

Layout.displayName = 'Layout'

Layout.defaultProps = {}
