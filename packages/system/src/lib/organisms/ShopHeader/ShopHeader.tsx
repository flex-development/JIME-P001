import { MobileHamburgerMajor } from '@shopify/polaris-icons'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box } from '@system/lib/atoms/Box'
import { Button } from '@system/lib/atoms/Button'
import { CartPreview } from '@system/lib/atoms/CartPreview'
import { Header, HeaderProps } from '@system/lib/atoms/Header'
import { SearchBar } from '@system/lib/molecules/SearchBar'
import { EventHandlers } from '@system/types'
import { FC } from 'react'
import { ShopHeaderProps } from './ShopHeader.props'

/**
 * @file Implementation - ShopHeader
 * @module lib/organisms/ShopHeader/impl
 */

/**
 * Displays the sidebar button, searchbar, and cart preview. The cart preview
 * will be rendered as a `Link`, that when clicked, will bring the user to their
 * cart.
 * Renders a `Header` component with the class `shop-header`.
 */
export const ShopHeader: FC<ShopHeaderProps> = props => {
  const {
    cart_url,
    handleSearch,
    handleSidebar = (event: EventHandlers.Click.Button) => {
      event.preventDefault && event.preventDefault()
      console.log('TODO: ShopHeader.handleSidebar')
    },
    ...rest
  } = props

  const sanitized = useSanitizedProps<'header', HeaderProps>(
    rest,
    'shop-header'
  )

  return (
    <Header {...sanitized}>
      <Box className='shop-header-col'>
        <Button
          $variant='ghost'
          className='shop-header-btn'
          name='sidebar'
          onClick={handleSidebar}
        >
          <MobileHamburgerMajor className='icon' />
        </Button>
        <SearchBar
          className='shop-header-search-bar'
          handleSearch={handleSearch}
          placeholder='ash trays'
        />
      </Box>
      <Box className='shop-header-col'>
        <CartPreview href={cart_url} />
      </Box>
    </Header>
  )
}

ShopHeader.displayName = 'ShopHeader'

ShopHeader.defaultProps = {
  cart_url: '/cart'
}
