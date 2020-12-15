import {
  LinkProps,
  ShopHeaderProps,
  ShopLayout
} from '@flex-development/kustomzdesign'
import { IPageProps, PC } from '@subdomains/app/interfaces'
import {
  useCMSAuth,
  useMenus,
  usePage,
  usePlaylistSettingsForm,
  useProfileSnippetForm
} from '@subdomains/cms/hooks'
import { merge } from 'lodash'
import { Provider as NextAuthProvider, Session } from 'next-auth/client'
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
 * Renders the store layout and current page and initializes the NextAuth
 * provider component.
 *
 * @todo Get hero data from CMS
 * @todo Finish implementing PlaylistBar functionality
 *
 * @param props - Component properties
 * @param props.page - Next.js page component
 * @param props.pageProps - Props from Next.js data-fetching methods
 */
export const AppLayout: FC<AppLayoutProps> = (props: AppLayoutProps) => {
  const { page: Component, pageProps } = props

  // Handle CMS user session
  const { session } = useCMSAuth()

  // Get site navigation as menu links
  const menus = useMenus()

  // Get page data
  const page = usePage(pageProps.page)

  // Register profile snippet settings form (data used in Sidebar)
  const { modified: snippet } = useProfileSnippetForm()

  // Register playlist settings form
  const { modified: playlist } = usePlaylistSettingsForm()

  // Handle playlist streaming
  // const { kit, queue } = usePlaylist(playlist.url)

  // Don't render content until queue is ready to be played
  // if (isEmpty(queue)) return null

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
    <NextAuthProvider session={(session || {}) as Session}>
      <Head>
        {/* Viewport for responsive web design */}
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,viewport-fit=cover'
        />
      </Head>

      <ShopLayout
        header={{ handleSearch: handleSearchCB }}
        sidebar={{
          age: snippet.age,
          img: snippet.img || undefined,
          location: snippet.location,
          menu: menus.main as Array<LinkProps>,
          mood: snippet.mood
        }}
      >
        <Component {...merge(pageProps, { page })} />
      </ShopLayout>
    </NextAuthProvider>
  )
}

AppLayout.defaultProps = {}
