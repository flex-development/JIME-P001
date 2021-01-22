import type { ShopHeaderProps } from '@components/organisms/ShopHeader'
import { Layout } from '@components/templates/Layout'
import { useWebFontLoader } from '@subdomains/app/hooks/useWebFontLoader'
import type { IPageProps, PageComponent } from '@subdomains/app/types'
import Head from 'next/head'
import type { FC } from 'react'
import { useCallback } from 'react'

/**
 * @file Implementation - AppLayout
 * @module subdomains/app/components/AppLayout/impl
 */

export interface AppLayoutProps {
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
export const AppLayout: FC<AppLayoutProps> = (props: AppLayoutProps) => {
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

  return (
    <>
      <Head>
        {/* Viewport for responsive web design */}
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,viewport-fit=cover'
        />
      </Head>

      <Layout
        header={{ handleSearch: handleSearchCB }}
        loading={!webfonts}
        playlistbar={{ songs: pageProps.layout.playlist.tracks }}
        sidebar={pageProps.layout.sidebar}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

AppLayout.displayName = 'AppLayout'

AppLayout.defaultProps = {}
