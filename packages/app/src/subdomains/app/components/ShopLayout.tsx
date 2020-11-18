import {
  useCMSData,
  usePlaylistForm,
  useProfileSnippetForm
} from '@app/subdomains/cms/hooks'
import { usePlaylist } from '@app/subdomains/streaming/hooks'
import { ErrorTemplate } from '@flex-development/kustomzdesign'
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
  const { page, title } = useCMSData()
  const { data, error, loading } = page

  // Register profile snippet settings form (data used in Sidebar)
  const { modified: snippet } = useProfileSnippetForm()

  // Register playlist settings form
  const { modified: playlist_settings } = usePlaylistForm()

  // Handle playlist streaming
  const playlist = usePlaylist(playlist_settings.url)

  // if (playlist.play) playlist.play()

  return (
    <Fragment>
      <Head title={title} />
      {((): ReactNode => {
        if (error) {
          return <ErrorTemplate code={error.code} message={error.message} />
        }

        return (
          <Fragment>
            <Component page={data} session={session} />
          </Fragment>
        )
      })()}
    </Fragment>
  )
}

ShopLayout.defaultProps = {}
