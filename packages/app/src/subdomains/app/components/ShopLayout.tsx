import {
  useCMSData,
  usePlaylistSettingsForm,
  useProfileSnippetForm
} from '@app/subdomains/cms/hooks'
import { usePlaylist } from '@app/subdomains/streaming/hooks'
import { FeathersErrorJSON } from '@feathersjs/errors'
import {
  Column,
  ErrorTemplate,
  FlexBox,
  GRID_BREAKPOINTS,
  Hero,
  PlaylistBar,
  Row,
  ShopHeader,
  Sidebar,
  useVisibility
} from '@flex-development/kustomzdesign'
import { isEmpty, merge } from 'lodash'
import React, { FC, Fragment, ReactNode } from 'react'
import { IPageProps, PC } from '../interfaces'
import { Head } from './Head'

/**
 * @file Shop Layout
 * @module subdomains/app/components/ShopLayout
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
  const { preview } = pageProps

  // Get metadata, site navigation as menu links, and data for current page
  const { menus, page, title } = useCMSData()

  // Use CMS data if page is in preview mode
  if (preview && !page.error) pageProps.page = merge(pageProps.page, page.data)

  // Register profile snippet settings form (data used in Sidebar)
  const { modified: snippet } = useProfileSnippetForm()

  // Handle sidebar
  const sidebar = useVisibility(GRID_BREAKPOINTS.lg)

  // Register playlist settings form
  const { modified: playlist } = usePlaylistSettingsForm()

  // Handle playlist streaming
  const { kit, queue } = usePlaylist(playlist.url)

  if (isEmpty(queue)) return null

  return (
    <Fragment>
      <Head title={title} />
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
            menu={menus.main}
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
            className='position-fixed top-0 w-available w-100'
            handleSidebar={sidebar.toggleVisibility}
            px={24}
            py={20}
          />
          <FlexBox
            className={`${sidebar.breakpoints.sm ? 'd-none' : ''}`}
            direction='column'
          >
            <Hero
              subtitle='Kustom made pot head necessities.'
              title='Morenas Kustomz'
            />
            {((): ReactNode => {
              const cms_error = preview && page.error
              const server_error = pageProps.page as FeathersErrorJSON

              if (cms_error || server_error?.code) {
                const { code, message } = cms_error || server_error
                return <ErrorTemplate code={code} message={message} />
              }

              return <Component {...pageProps} />
            })()}
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
