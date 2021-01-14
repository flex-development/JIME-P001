import { CustomersMajor } from '@shopify/polaris-icons'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Aside, AsideProps } from '@system/lib/atoms/Aside'
import { Box } from '@system/lib/atoms/Box'
import { Footer } from '@system/lib/atoms/Footer'
import { Image } from '@system/lib/atoms/Image'
import { Link, LinkProps } from '@system/lib/atoms/Link'
import { Paragraph } from '@system/lib/atoms/Paragraph'
import { Menu } from '@system/lib/molecules/Menu'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { SidebarProps } from './Sidebar.props'

/**
 * @file Implementation - Sidebar
 * @module lib/organisms/Sidebar/impl
 */

/**
 * Displays a MySpace style profile snippet and the shop menu.
 * Renders an `Aside` component with the class `sidebar`.
 */
export const Sidebar: FREC<SidebarProps> = forwardRef((props, ref) => {
  const { age, img, location, menu = [], mood, ...rest } = props

  const sanitized = useSanitizedProps<'aside', AsideProps>(rest, 'sidebar')

  const developer: LinkProps = {
    href: 'https://flexdevelopment.llc',
    target: '_blank',
    title: 'Flex Development'
  }

  return (
    <Aside {...sanitized} ref={ref}>
      <Link className='sidebar-profile-link-img' href={img} target='_blank'>
        <Image
          alt='Profile image for Morena'
          height={1920}
          loading='eager'
          src={img}
          width={1920}
        />
      </Link>

      <Box className='sidebar-profile-details'>
        <Paragraph className='sidebar-profile-online-status'>
          <CustomersMajor className='icon' />
          Online Now!
        </Paragraph>
        <Paragraph className='sidebar-profile-name'>Morena</Paragraph>
        <Paragraph className='sidebar-profile-age'>
          {`${age} years old`}
        </Paragraph>
        <Paragraph className='sidebar-profile-location'>{location}</Paragraph>
        <Paragraph className='sidebar-profile-mood'>
          {`Mood: ${mood}`}
        </Paragraph>
      </Box>

      <Menu $items={menu} className='sidebar-menu' />

      <Footer className='sidebar-footer'>
        <Paragraph className='developer-credit'>
          Made with love by <Link {...developer} />
        </Paragraph>
      </Footer>
    </Aside>
  )
})

Sidebar.displayName = 'Sidebar'

Sidebar.defaultProps = {
  age: 22,
  img: 'assets/morena.jpeg',
  location: 'New York',
  menu: [],
  mood: 'High 🤪'
}
