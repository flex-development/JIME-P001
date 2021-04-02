import type { ANYTHING } from '@flex-development/json/utils/types'
import { CartPreviewProps } from '@system/lib/atoms/CartPreview'
import { HeaderProps } from '@system/lib/atoms/Header'
import { SearchBarProps } from '@system/lib/molecules/SearchBar'
import { EventHandlers } from '@system/types'

/**
 * @file Component Props - ShopHeader
 * @module lib/organisms/ShopHeader/props
 */

export interface ShopHeaderProps extends HeaderProps {
  /**
   * URL to redirect the user to when the cart preview link is clicked.
   *
   * @default '/cart'
   */
  cart_url?: CartPreviewProps['href']

  /**
   * Fires when user submits the search form using the "Enter" button.
   */
  handleSearch?: SearchBarProps['handleSearch']

  /**
   * Sidebar button handler. Fires when the sidebar button is clicked.
   */
  handleSidebar?(event: EventHandlers.Click.Button): ANYTHING
}
