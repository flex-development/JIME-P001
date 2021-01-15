import { ShopHeaderProps } from '@lib/organisms/ShopHeader'
import { Layout } from '@lib/templates/Layout'
import { useWebFontLoader } from '@subdomains/app/hooks/useWebFontLoader'
import { IPageProps, PC } from '@subdomains/app/interfaces'
import { useMenu } from '@subdomains/cms/hooks/useMenu'
import { usePlaylist } from '@subdomains/streaming/hooks/usePlaylist'
import Head from 'next/head'
import { FC, useCallback } from 'react'

/**
 * @file Application Layout component
 * @module subdomains/app/components/AppLayout/impl
 */

export interface AppLayoutProps {
  /**
   * The current Next.js page component being rendered.
   */
  page: PC

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
 * @param props.pageProps.globals - Shopify `globals` namespace metafields obj
 */
export const AppLayout: FC<AppLayoutProps> = (props: AppLayoutProps) => {
  const { page: Component, pageProps } = props

  // Load Web Fonts
  const webfonts = useWebFontLoader({ typekit: { id: 'oee3tpl' } })

  // Get main menu
  const menu = useMenu('main-menu')

  // Handle songs to stream
  const playlist = usePlaylist(`${pageProps.globals.playlist_url.value}`)

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
        loading={!webfonts || menu.isValidating || playlist.loading}
        playlistbar={{ songs: playlist.songs }}
        sidebar={{
          age: JSON.parse(pageProps.globals.profile_age.value as string),
          img: (() => {
            const img = pageProps.globals.profile_img.value as string

            if (!img?.length) return undefined

            return JSON.parse(img)[0].cloudinary_src
          })(),
          location: pageProps.globals.profile_location.value as string,
          menu: (menu.data?.links ?? []).map(({ title, url }) => ({
            href: url,
            title
          })),
          mood: pageProps.globals.profile_mood.value as string
        }}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

AppLayout.displayName = 'AppLayout'

AppLayout.defaultProps = {}
