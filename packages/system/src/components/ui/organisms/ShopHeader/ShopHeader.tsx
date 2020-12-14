import { ANYTHING } from '@flex-development/json'
import { Button, Column, Header, LinkProps } from '@system/components/ui/atoms'
import {
  CartPreview,
  SearchBar,
  SearchBarProps
} from '@system/components/ui/molecules'
import { useSanitizedProps } from '@system/hooks'
import { EventHandlers, MutatedProps } from '@system/types'
import { FC } from 'react'

/**
 * @file Render sidebar button, searchbar, and cart preview
 * @module components/ui/organisms/ShopHeader/impl
 */

export interface ShopHeaderProps extends MutatedProps {
  /**
   * URL to redirect the user to when the cart preview link is clicked.
   *
   * @default '/cart'
   */
  cart_url?: LinkProps['href']

  /**
   * Searchbar handler. Fires when the users submits the search form or
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

/**
 * Displays the sidebar button, searchbar, and cart preview. The cart preview
 * will be rendered as a `Link`, that when clicked, will bring the user to their
 * cart.
 *
 * Renders a `Header` component with the class `shop-header`.
 */
export const ShopHeader: FC<ShopHeaderProps> = (props: ShopHeaderProps) => {
  const {
    cart_url,
    handleSearch,
    handleSidebar = (event: EventHandlers.Click.Button) => {
      event.preventDefault && event.preventDefault()
      console.log('TODO: ShopHeader.handleSidebar')
    },
    ...rest
  } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'shop-header')

  return (
    <Header {...sanitized}>
      <Column align='center' flex>
        <Button
          className='shop-header-btn'
          icon={{ children: 'menu' }}
          onClick={handleSidebar}
          name='sidebar'
          variant='ghost'
        />
        <SearchBar
          className='shop-header-searchbar'
          handleSearch={handleSearch}
          placeholder='ash trays'
        />
      </Column>
      <Column className='w-sm-maxc' flex justify='end'>
        <CartPreview href={cart_url} />
      </Column>
    </Header>
  )
}

ShopHeader.displayName = 'ShopHeader'

ShopHeader.defaultProps = {
  cart_url: '/cart'
}
