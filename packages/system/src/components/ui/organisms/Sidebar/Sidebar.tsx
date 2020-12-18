import { NullishNumber, NullishString } from '@flex-development/json'
import {
  Aside,
  Box,
  Column,
  FlexBoxProps,
  Icon,
  Image,
  ImageProps,
  Link,
  LinkProps,
  Paragraph,
  Row
} from '@system/components/ui/atoms'
import { Menu } from '@system/components/ui/molecules'
import { useFlexbox, useSanitizedProps } from '@system/hooks'
import { FREC } from '@system/types'
import { forwardRef } from 'react'

/**
 * @file Display MySpace style profile snippet and shop menu
 * @module components/ui/organisms/Sidebar/impl
 */

export interface SidebarProps extends FlexBoxProps {
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
export const Sidebar: FREC<SidebarProps> = forwardRef((props, ref) => {
  const {
    age,
    align,
    direction,
    display,
    img,
    justify,
    location,
    menu = [],
    mood,
    wrap,
    ...rest
  } = props

  const flexbox = useFlexbox({
    align,
    direction,
    display,
    justify,
    wrap
  })

  const sanitized = useSanitizedProps<typeof rest>(rest, {
    [flexbox]: flexbox.length !== 0,
    sidebar: true
  })

  const developer: LinkProps = {
    href: 'https://flexdevelopment.llc',
    target: '_blank',
    title: 'Flex Development'
  }

  return (
    <Aside {...sanitized} ref={ref}>
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
              <Image
                alt='Profile image for Morena'
                fluid
                height={1920}
                src={img}
                width={1920}
              />
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
              <Icon mat='person' />
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
})

Sidebar.displayName = 'Sidebar'

Sidebar.defaultProps = {
  age: 22,
  img: 'assets/morena.jpeg',
  location: 'New York',
  menu: [],
  mood: 'High 🤪'
}
