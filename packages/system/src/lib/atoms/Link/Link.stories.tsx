import { Link } from './Link'
import { LinkProps } from './Link.props'

/**
 * @file Stories - Link
 * @module lib/atoms/Link/stories
 */

export default {
  component: Link,
  parameters: {
    jest: ['Link']
  },
  title: 'Library/Atoms/Link'
}

export const Default: FCS<LinkProps> = args => <Link {...args} />

Default.args = {
  children: 'Link text'
}

export const Button: FCS<LinkProps> = args => <Link {...args} />

Button.args = {
  $btn: 'primary',
  children: 'Button link'
}

export const Dropdown: FCS<LinkProps> = args => <Link {...args} />

Dropdown.args = {
  $dropdown: true,
  children: 'Dropdown link'
}

export const DropdownToggle: FCS<LinkProps> = args => <Link {...args} />

DropdownToggle.args = {
  $dropdown: 'toggle',
  children: 'Dropdown toggle'
}

export const Nav: FCS<LinkProps> = args => <Link {...args} />

Nav.args = {
  $menu: true,
  children: 'Nav link'
}
