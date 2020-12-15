import {
  LinkProps,
  ShopHeaderProps,
  ShopLayout,
  SidebarProps,
  useMemoCompare
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
import { FC } from 'react'

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

  // Handle CMS user session and access CMS instance
  const { cms, preview, session } = useCMSAuth()

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

  //  Get `ShopHeader` component props
  const header = useMemoCompare<ShopHeaderProps>({
    handleSearch: (term, event) => {
      event.preventDefault()
      window.location.href = `/search?term=${term}`
    },
    style: { top: preview ? '62px' : 0 }
  })

  // Get `Sidebar` component props
  const sidebar = useMemoCompare<SidebarProps>({
    age: snippet.age,
    img: snippet.img || undefined,
    location: snippet.location,
    menu: menus.main as Array<LinkProps>,
    mood: snippet.mood
  })

  return (
    <NextAuthProvider session={(session || {}) as Session}>
      <Head>
        {/* Viewport for responsive web design */}
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,viewport-fit=cover'
        />
      </Head>

      <ShopLayout header={header} sidebar={sidebar}>
        <Component {...merge(pageProps, { page })} />
      </ShopLayout>
    </NextAuthProvider>
  )
}

AppLayout.defaultProps = {}
