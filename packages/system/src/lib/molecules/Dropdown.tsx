import { useMutatedProps } from '@kustomz/hooks'
import React, { FC } from 'react'
import useBoolean from 'react-hanger/array/useBoolean'
import { Box, BoxProps, Item, Link, LinkProps, List } from '../atoms'

/**
 * @file Render a dropdown menu
 * @module lib/molecules/Dropdown
 */

/**
 * `Dropdown` component properties.
 */
export interface DropdownProps extends BoxProps {
  /**
   * If `true`, make dropdown menu visible.
   *
   * @default false
   */
  expanded?: boolean

  /**
   * Array of links to render.
   *
   * @default []
   */
  links?: LinkProps[]

  /**
   * Title of dropdown.
   */
  title: string
}

/**
 * Renders a `Fragment` component with a dropdown link and menu. The visibility
 * of the menu can be toggled by clicking the dropdown link.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/navs/#using-dropdowns
 */
export const Dropdown: FC<DropdownProps> = (props: DropdownProps) => {
  const {
    expanded: initialExpanded = false,
    links = [],
    title,
    ...rest
  } = props

  const mutatedProps = useMutatedProps<typeof rest, BoxProps>(rest, 'dropdown')

  const [expanded, { toggle }] = useBoolean(initialExpanded)

  return (
    <Box {...mutatedProps}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        aria-expanded={expanded}
        className='dropdown-header'
        onClick={() => toggle()}
        toggle
      >
        {title}
      </Link>

      <List className='dropdown-menu'>
        {links.map(link => (
          <Item>
            <Link {...link} dropdown />
          </Item>
        ))}
      </List>
    </Box>
  )
}

Dropdown.defaultProps = {
  expanded: false,
  links: []
}
