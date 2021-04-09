import { useWebFontLoader } from '@app/hooks/useWebFontLoader'
import type { IAppInitialProps, IPageProps, PageComponent } from '@app/types'
import { useSlideInOut } from '@design/hooks/useSlideInOut'
import type { BoxProps } from '@design/lib/atoms/Box'
import { Box, BoxAnimated } from '@design/lib/atoms/Box'
import { Span } from '@design/lib/atoms/Span'
import { SVG } from '@design/lib/atoms/SVG'
import { Hero } from '@design/lib/organisms/Hero'
import { PlaylistBar } from '@design/lib/organisms/PlaylistBar'
import { ShopHeader } from '@design/lib/organisms/ShopHeader'
import { Sidebar } from '@design/lib/organisms/Sidebar'
import { GridBreakpoints } from '@design/types'
import type { AnimatedProps } from '@react-spring/web'
import merge from 'lodash/merge'
import Head from 'next/head'
import type { FC, FormEvent } from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import { useBoolean } from 'react-hanger/array/useBoolean'
import useEvent from 'react-use/useEvent'
import useMedia from 'react-use/useMedia'
import UAParser from 'ua-parser-js'
import { SEO } from '../SEO'

/**
 * @file Implementation - Layout
 * @module components/Layout/impl
 */

export interface LayoutProps {
  /**
   * `Hero`, `PlaylistBar` and `Sidebar` data.
   */
  data: IAppInitialProps['layout']

  /**
   * The current Next.js page component being rendered.
   */
  page: PageComponent

  /**
   * Props from Next.js data-fetching methods.
   */
  pageProps: IPageProps

  /**
   * `User-Agent` header.
   */
  ua?: IAppInitialProps['ua']
}

/**
 * Renders the store layout and current page.
 *
 * @param {LayoutProps} props - Component properties
 * @return {JSX.Element} Current page wrapped in store layout
 */
export const Layout: FC<LayoutProps> = (props: LayoutProps): JSX.Element => {
  const { data, page: Component, pageProps, ua } = props

  // Load Web Fonts
  const webfonts = useWebFontLoader({ typekit: { id: process.env.TYPEKIT_ID } })

  /**
   * Redirects the user to the search page with their search {@param term}.
   *
   * @param {string} term - User search query
   * @param {FormEvent} event - `SearchBar` event
   */
  const handleSearch = (term: string, event: FormEvent): void => {
    event.preventDefault()
    window.location.href = `/search?term=${term}`
  }

  /* Callback version of `handleSearch` */
  const handleSearchCB = useCallback(handleSearch, [])

  // `Sidebar` ready state
  const [sready, { setValue: setSidebarReady }] = useBoolean(false)

  // ! Parse user agent to get device type
  const dtype = useMemo<string | undefined>(() => {
    return new UAParser(ua || '').getDevice().type
  }, [ua])

  // ! True if browser window width > `${GridBreakpoints.lg}px`
  const lg = useMedia(`(min-width: ${GridBreakpoints.lg}px)`, !dtype)

  /**
   * ! When SSRing on desktop browsers that been resized to a maximum width of
   * ! `GridBreakpoints.lg` pixels, `lg` will default to true on first load,
   * ! thus hiding `.layout-grid > .content-col`.
   *
   * ! Below, we use the `Sidebar` ready state to first determine if the value
   * ! of `lg` should be used.
   */
  const sidebar_a = useSlideInOut<HTMLDivElement>(sready ? lg : false)

  /**
   * ! Afterwards, we wait until we're client-side to update the `Sidebar`
   * ! animation and ready state so that our content isn't accidentally hidden.
   */
  useEffect(() => {
    if (typeof window === 'undefined' || sready) return

    sidebar_a.setVisibility(window.outerWidth > GridBreakpoints.lg)
    setSidebarReady(true)
  })

  // Close `Sidebar` when window width < `${GridBreakpoints.lg}px`
  useEvent('resize', () => sidebar_a.setVisibility(lg))

  return (
    <>
      <Head>
        {/* Viewport for responsive web design */}
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,viewport-fit=cover'
        />
      </Head>

      {/* SEO */}
      <SEO {...merge(data.seo, pageProps?.seo ?? {})} />

      {/* View */}
      <Box className='layout' data-loading={!webfonts || !sready}>
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
            ref={sidebar_a.ref}
            style={sidebar_a.style as AnimatedProps<BoxProps>['style']}
          >
            <Sidebar {...data.sidebar} />
          </BoxAnimated>

          <Box className='content-col'>
            <Hero subtitle={data.hero.subtitle} title={data.hero.title} />
            <Component {...pageProps} />
          </Box>
        </Box>

        <PlaylistBar songs={data.playlist.tracks} />
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
