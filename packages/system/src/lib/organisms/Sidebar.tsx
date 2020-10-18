import { NullishNumber, NullishString } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, { FC } from 'react'
import {
  Aside,
  Box,
  Icon,
  Image,
  ImageProps,
  Link,
  LinkProps,
  Paragraph
} from '../atoms'
import { Menu } from '../molecules'

/**
 * @file Display MySpace style profile snippet and shop menu
 * @module lib/organisms/Sidebar
 */

/**
 * `Sidebar` component properties.
 */
export interface SidebarProps extends MutatedProps {
  /**
   * Profile age.
   *
   * @default {}
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

  const mutated = useMutatedProps<typeof rest>(rest, 'sidebar')

  const developer: LinkProps = {
    href: 'https://flexdevelopment.llc',
    target: '_blank',
    title: 'Flex Development'
  }

  return (
    <Aside {...mutated}>
      <Box>
        <Box className='sidebar-profile'>
          <Box className='col-sm-7 col-12 mb-sm-0 mb-36 mr-sm-24'>
            <Link className='sidebar-profile-img' href={img} target='_blank'>
              <Image alt='Profile image for Morena' fluid src={img} />
            </Link>
          </Box>
          <Box
            className='col-sm-5 col-12 flex-column justify-content-center'
            flex
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
          </Box>
        </Box>

        <Menu className='sidebar-menu' links={menu} />
      </Box>

      <Paragraph className='sidebar-developer-credit'>
        Made with love by <Link {...developer} />
      </Paragraph>
    </Aside>
  )
}

Sidebar.defaultProps = {
  age: 22,
  img: 'assets/morena.jpeg',
  location: 'New York',
  menu: [],
  mood: 'High 🤪'
}
