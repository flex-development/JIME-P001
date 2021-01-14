import { ANYTHING } from '@flex-development/json/utils/types'
import { HeaderProps } from '@system/lib/atoms/Header'
import { LinkProps } from '@system/lib/atoms/Link'
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
  cart_url?: LinkProps['href']

  /**
   * SearchBar handler. Fires when the users submits the search form or
   * clicks the search button.
   */
  handleSearch?: SearchBarProps['handleSearch']

  /**
   * Sidebar button handler. Fires when the sidebar button is clicked.
   *
   * @param event - `click` event from sidebar button
   */
  handleSidebar?(event: EventHandlers.Click.Button): ANYTHING
}
