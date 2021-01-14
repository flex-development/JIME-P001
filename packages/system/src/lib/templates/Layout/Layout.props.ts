import { HeroProps } from '@system/lib/organisms/Hero'
import { PlaylistBarProps } from '@system/lib/organisms/PlaylistBar'
import { ShopHeaderProps } from '@system/lib/organisms/ShopHeader'
import { SidebarProps } from '@system/lib/organisms/Sidebar'
import { ReactNode } from 'react'

/**
 * @file Component Props - Layout
 * @module lib/templates/Layout/props
 */

export interface LayoutProps {
  /**
   * Component representing the current page.
   */
  children?: ReactNode

  /**
   * Props to pass to the `ShopHeader` component.
   *
   * @default {}
   */
  header?: ShopHeaderProps

  /**
   * Props to pass to the `Hero` component.
   */
  hero?: HeroProps

  /**
   * If true, show loading screen instead of content.
   */
  loading?: boolean

  /**
   * Props to pass to the `PlaylistBar` component.
   *
   * @default {}
   */
  playlistbar?: PlaylistBarProps

  /**
   * Props to pass to the `Sidebar` component.
   *
   * @default {}
   */
  sidebar?: SidebarProps
}
