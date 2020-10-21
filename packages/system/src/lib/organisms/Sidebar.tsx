import { NullishNumber, NullishString } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, { FC } from 'react'
import {
  Aside,
  Box,
  Column,
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
          <Column mb={{ sm: 0, xs: 36 }} mr={{ sm: 24, xs: 0 }} sm={7} xs={12}>
            <Link className='sidebar-profile-img' href={img} target='_blank'>
              <Image alt='Profile image for Morena' fluid src={img} />
            </Link>
          </Column>
          <Column direction='column' flex justify='center' sm={5} xs={12}>
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
