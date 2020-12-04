import { IPageProps, PC } from '@app/subdomains/app/interfaces'
import {
  useMenus,
  usePage,
  usePlaylistSettingsForm,
  useProfileSnippetForm
} from '@app/subdomains/cms/hooks'
import { useCart } from '@app/subdomains/sales'
import { usePlaylist } from '@app/subdomains/streaming/hooks'
import {
  Column,
  FlexBox,
  GRID_BREAKPOINTS,
  Hero,
  LinkProps,
  PlaylistBar,
  Row,
  ShopHeader,
  Sidebar,
  useVisibility
} from '@flex-development/kustomzdesign'
import { isEmpty, merge } from 'lodash'
import Head from 'next/head'
import { FC, Fragment } from 'react'
import { useCMS } from 'tinacms'

/**
 * @file Shop Layout
 * @module subdomains/app/components/ShopLayout/impl
 */

export interface ShopLayoutProps {
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
 */
export const ShopLayout: FC<ShopLayoutProps> = (props: ShopLayoutProps) => {
  const { page: Component, pageProps } = props

  // Check if CMS is enabled
  const cms = useCMS()

  // Get site navigation as menu links
  const menus = useMenus()

  // Get page data
  const page = usePage(pageProps.page)

  // Register playlist settings form
  const { modified: playlist } = usePlaylistSettingsForm()

  // Register profile snippet settings form (data used in Sidebar)
  const { modified: snippet } = useProfileSnippetForm()

  // Get cart information
  const cart = useCart()

  // Handle sidebar
  const sidebar = useVisibility(GRID_BREAKPOINTS.lg)

  // Handle playlist streaming
  const { kit, queue } = usePlaylist(playlist.url)

  // Don't render content until queue is ready to be played
  if (isEmpty(queue)) return null

  return (
    <Fragment>
      <Head>
        {/* Viewport for responsive web design */}
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,viewport-fit=cover'
        />
      </Head>
      <Row gx={0} justify='end'>
        <Column
          className={`sidebar-col${sidebar.visible ? '' : ' d-none'}`}
          lg={sidebar.visible ? 4 : 12}
          mt={0}
          px={0}
          xl={sidebar.visible ? 3 : 12}
        >
          <Sidebar
            age={snippet.age}
            img={snippet.img || undefined}
            location={snippet.location}
            menu={menus.main as Array<LinkProps>}
            mood={snippet.mood}
          />
        </Column>

        <Column
          lg={sidebar.visible ? 8 : 12}
          mt={0}
          px={0}
          xl={sidebar.visible ? 9 : 12}
        >
          <ShopHeader
            className='position-fixed w-available w-100'
            handleSearch={(term, event) => {
              event.preventDefault()
              window.location.href = `/search?term=${term}`
            }}
            handleSidebar={sidebar.toggleVisibility}
            items={cart.items.length}
            px={24}
            py={20}
            style={{ top: cms.enabled ? '62px' : 0 }}
          />
          <FlexBox
            className={`${sidebar.breakpoints.sm ? 'd-none' : ''}`}
            direction='column'
          >
            <Hero
              subtitle='Kustom made pot head necessities.'
              title='Morenas Kustomz'
            />
            <Component {...merge(pageProps, { page })} />
          </FlexBox>
        </Column>
      </Row>

      <PlaylistBar
        className='bottom-0 position-fixed w-100'
        handleSkip={({ target }) => {
          return target.name === 'skip_next'
            ? kit.player.skipToNextItem()
            : kit.player.skipToPreviousItem()
        }}
        playback={kit.player.playbackState}
        pr={24}
        song={(() => {
          const { position: pos } = queue
          return queue.item(pos === -1 ? 0 : pos)?.attributes || {}
        })()}
      />
    </Fragment>
  )
}

ShopLayout.defaultProps = {}
