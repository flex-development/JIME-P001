import {
  HeroProps,
  PlaylistBarProps,
  ShopHeaderProps,
  SidebarProps
} from '@system/lib/organisms'
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
