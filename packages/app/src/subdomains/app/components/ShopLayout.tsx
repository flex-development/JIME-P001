import { useCMSData, useProfileSnippetForm } from '@app/subdomains/cms/hooks'
import { ErrorTemplate } from '@flex-development/kustomzdesign'
import React, { FC, Fragment, ReactNode } from 'react'
import { IPageProps, PC } from '../interfaces'
import { Head } from './Head'

/**
 * @file Shop Layout
 * @module components/layout/ShopLayout
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
 *
 * @todo Implement `usePlaylistForm`
 * @todo Implement `ShopHeader`
 * @todo Implement `Sidebar`
 * @todo Implement `PlaylistBar`
 * @todo Pass metadata from `useCMSData` to `Head` component
 * @todo Handle loading state
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
