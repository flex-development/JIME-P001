import { NullishNumber, NullishString } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@kustomz/hooks'
import { MutatedProps } from '@kustomz/types'
import React, { FC } from 'react'
import uuid from 'react-uuid'
import {
  Aside,
  Box,
  Icon,
  Image,
  ImageProps,
  Link,
  LinkProps,
  Nav,
  Paragraph
} from '../atoms'

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

  const mutatedProps = useMutatedProps<typeof rest>(rest, 'sidebar')

  const developer: LinkProps = {
    href: 'https://flexdevelopment.llc',
    target: '_blank',
    title: 'Flex Development'
  }

  return (
    <Aside {...mutatedProps}>
      <Box>
        <Box className='sidebar-profile'>
          <Box className='col-sm-7 col-12 mb-sm-0 mb-12 mr-sm-6'>
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

        <Nav className='sidebar-menu'>
          {menu.map((link: LinkProps) => (
            <Link {...link} key={uuid()} nav />
          ))}
        </Nav>
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
