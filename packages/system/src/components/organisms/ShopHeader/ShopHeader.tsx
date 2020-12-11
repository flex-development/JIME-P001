import { ANYTHING } from '@flex-development/json'
import { useSanitizedProps } from '@system/hooks'
import { EventHandlers, MutatedProps } from '@system/types'
import { FC } from 'react'
import { usePrevious } from 'react-hanger'
import { Spring } from 'react-spring'
import { Button, Column, Header, Link, LinkProps, Span } from '../../atoms'
import { SearchBar, SearchBarProps } from '../../molecules'

/**
 * @file Render sidebar button, searchbar, and cart preview
 * @module components/organisms/ShopHeader/impl
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

  /**
   * Number of items in the user's cart.
   *
   * @default 0
   */
  items?: number
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
    items = 0,
    ...rest
  } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'shop-header')
  const items_prev = usePrevious<number>(items)

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
        <Link
          className='shop-header-cart-preview'
          href={cart_url}
          target='_blank'
        >
          Cart&nbsp;&nbsp;/&nbsp;&nbsp;
          <Span>
            <Spring
              config={{ precision: 0.999 }}
              from={{ items: items_prev }}
              to={{ items }}
            >
              {({ items: num = 0 }) => (
                <>
                  <Span>{num}</Span> {`Item${items === 1 ? '' : 's'}`}
                </>
              )}
            </Spring>
          </Span>
        </Link>
      </Column>
    </Header>
  )
}

ShopHeader.displayName = 'ShopHeader'

ShopHeader.defaultProps = {
  cart_url: '/cart',
  items: 0
}
