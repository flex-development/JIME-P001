import {
  LinkProps,
  ShopHeaderProps,
  ShopLayout,
  SidebarProps
} from '@flex-development/kustomzdesign'
import { IPageProps, PC } from '@subdomains/app/interfaces'
import {
  useMenus,
  usePage,
  usePlaylistSettingsForm,
  useProfileSnippetForm
} from '@subdomains/cms/hooks'
import { useCart } from '@subdomains/sales'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import { merge } from 'lodash'
import Head from 'next/head'
import { FC, Fragment } from 'react'
import { useCMS } from 'tinacms'

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
 * @todo Get hero data from CMS
 * @todo Finish implementing PlaylistBar functionality
 *
 * @param props - Component properties
 * @param props.page - Next.js page component
 * @param props.pageProps - Props from Next.js data-fetching methods
 */
export const AppLayout: FC<AppLayoutProps> = (props: AppLayoutProps) => {
  const { page: Component, pageProps } = props

  // Get cart information
  const cart = useCart()

  // Check if CMS is enabled
  const cms = useCMS()

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
    items: cart.items_total,
    style: { top: cms.enabled ? '62px' : 0 }
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
    <Fragment>
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
    </Fragment>
  )
}

AppLayout.defaultProps = {}
