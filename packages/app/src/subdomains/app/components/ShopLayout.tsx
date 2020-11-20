import {
  useCMSData,
  usePlaylistForm,
  useProfileSnippetForm
} from '@app/subdomains/cms/hooks'
import { usePlaylist } from '@app/subdomains/streaming/hooks'
import {
  Column,
  ErrorTemplate,
  FlexBox,
  GRID_BREAKPOINTS,
  Hero,
  PlaylistBar,
  Row,
  ShopHeader,
  Sidebar
} from '@flex-development/kustomzdesign'
import { isEmpty } from 'lodash'
import React, { FC, Fragment, ReactNode, useEffect } from 'react'
import { useBoolean } from 'react-hanger/array/useBoolean'
import { useWindowSize } from 'use-hooks'
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
   * Current user session.
   */
  session: IPageProps['session']
}

/**
 * Renders the store layout and current page.
 *
 * @param props - Component properties
 * @param props.page - Next.js page component
 * @param props.session - Current user session
 */
export const ShopLayout: FC<ShopLayoutProps> = (props: ShopLayoutProps) => {
  const { page: Component, session } = props

  // Get metadata, site navigation as menu links, and data for current page
  const { menus, page, title } = useCMSData()
  const { data, error } = page

  // Register profile snippet settings form (data used in Sidebar)
  const { modified: snippet } = useProfileSnippetForm()

  // Register playlist settings form
  const { modified: playlist } = usePlaylistForm()

  // Handle playlist streaming
  const { kit, queue } = usePlaylist(playlist.url)

  // Handle window size
  const size = useWindowSize()

  // Handle sidebar
  const [sidebar, { setValue: setSidebar, toggle: handleSidebar }] = useBoolean(
    true
  )

  const sidebar_sm = sidebar && size.width <= GRID_BREAKPOINTS.sm

  // Close sidebar when window size is less than value of GRID_BREAKPOINTS.lg
  useEffect(() => {
    if (size.width > GRID_BREAKPOINTS.lg) {
      setSidebar(true)
    } else if (size.width <= GRID_BREAKPOINTS.lg) {
      setSidebar(false)
    }
  }, [setSidebar, size.width])

  if (isEmpty(queue)) return null

  return (
    <Fragment>
      <Head title={title} />
      {((): ReactNode => {
        if (error) {
          return <ErrorTemplate code={error.code} message={error.message} />
        }

        return (
          <Fragment>
            <Row gx={0} justify='end'>
              <Column
                className={`sidebar-col${sidebar ? '' : ' d-none'}`}
                lg={sidebar ? 4 : 12}
                mt={0}
                px={0}
                xl={sidebar ? 3 : 12}
              >
                <Sidebar
                  age={snippet.age}
                  img={snippet.img || undefined}
                  location={snippet.location}
                  menu={menus.main}
                  mood={snippet.mood}
                />
              </Column>

              <Column lg={sidebar ? 8 : 12} mt={0} px={0} xl={sidebar ? 9 : 12}>
                <ShopHeader
                  className='position-fixed top-0 w-available w-100'
                  handleSidebar={handleSidebar}
                  px={24}
                  py={20}
                />
                <FlexBox
                  className={`${sidebar_sm ? 'd-none' : ''}`}
                  direction='column'
                >
                  <Hero
                    subtitle='Kustom made pot head necessities.'
                    title='Morenas Kustomz'
                  />
                  <Component page={data} session={session} />
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
      })()}
    </Fragment>
  )
}

ShopLayout.defaultProps = {}
