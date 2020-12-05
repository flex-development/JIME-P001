import { NullishNumber, NullishString } from '@flex-development/json'
import { useSanitizedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import { FC } from 'react'
import {
  Aside,
  Box,
  Column,
  Icon,
  Image,
  ImageProps,
  Link,
  LinkProps,
  Paragraph,
  Row
} from '../../atoms'
import { Menu } from '../../molecules'

/**
 * @file Display MySpace style profile snippet and shop menu
 * @module components/organisms/Sidebar/impl
 */

export interface SidebarProps extends MutatedProps {
  /**
   * Profile age.
   *
   * @default 22
   */
  age?: NullishNumber

  /**
   * Profile image URL.
   *
   * @default {}
   */
  img?: ImageProps['src']

  /**
   * Profile location.
   *
   * @default 'New York'
   */
  location?: NullishString

  /**
   * Links to display in the sidebar menu.
   *
   * @default []
   */
  menu?: LinkProps[]

  /**
   * Profile mood.
   *
   * @default 'High 🤪'
   */
  mood?: NullishString
}

/**
 * Displays a MySpace style profile snippet and the shop menu. Renders an
 * `Aside` component with the class `sidebar`.
 */
export const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {
  const { age, menu = [], mood, img, location, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest>(rest, 'sidebar')

  const developer: LinkProps = {
    href: 'https://flexdevelopment.llc',
    target: '_blank',
    title: 'Flex Development'
  }

  return (
    <Aside {...sanitized}>
      <Box>
        <Row
          className='sidebar-profile'
          direction={{ xl: 'row', xs: 'column' }}
          justify={{ xl: 'between', xs: 'start' }}
          mb={36}
          mt={0}
          mx={0}
          wrap={false}
        >
          <Column
            mb={{ xl: 0, xs: 24 }}
            mr={0}
            mt={0}
            px={0}
            sm={8}
            xl={6}
            xs={12}
          >
            <Link className='sidebar-profile-img' href={img} target='_blank'>
              <Image alt='Profile image for Morena' fluid src={img} />
            </Link>
          </Column>
          <Column
            direction='column'
            flex
            justify='center'
            mt={0}
            px={0}
            xl={5}
            xs={12}
          >
            <Paragraph className='sidebar-profile-online-status'>
              <Icon outlined={false}>person</Icon>
              Online Now!
            </Paragraph>
            <Paragraph className='sidebar-profile-name'>Morena</Paragraph>
            <Paragraph className='sidebar-profile-age'>
              {`${age} years old`}
            </Paragraph>
            <Paragraph className='sidebar-profile-location'>
              {location}
            </Paragraph>
            <Paragraph className='sidebar-profile-mood'>
              {`Mood: ${mood}`}
            </Paragraph>
          </Column>
        </Row>

        <Menu className='sidebar-menu' links={menu} />
      </Box>

      <Paragraph className='developer-credit'>
        Made with love by <Link {...developer} />
      </Paragraph>
    </Aside>
  )
}

Sidebar.displayName = 'Sidebar'

Sidebar.defaultProps = {
  age: 22,
  img: 'assets/morena.jpeg',
  location: 'New York',
  menu: [],
  mood: 'High 🤪'
}
