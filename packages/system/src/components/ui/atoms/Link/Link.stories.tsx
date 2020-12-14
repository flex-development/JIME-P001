import { StoryFN } from '@system/types/storybook'
import { Link, LinkProps } from './Link'

/**
 * @file Stories - Link
 * @module components/ui/atoms/Link/stories
 */

export default {
  component: Link,
  parameters: {
    jest: ['Link']
  },
  title: 'Library/Atoms/Link'
}

/**
 * Default {@link Link} story.
 */
export const Default: StoryFN<LinkProps> = (args: LinkProps) => (
  <Link {...args} />
)

Default.args = {
  children: 'Link text'
}

/**
 * Button style {@link Link} story.
 */
export const ButtonStyle: StoryFN<LinkProps> = (args: LinkProps) => (
  <Link {...args} />
)

ButtonStyle.args = {
  btn: 'primary',
  children: 'Learn More'
}

export const Dropdown: StoryFN<LinkProps> = (args: LinkProps) => (
  <Link {...args} />
)

Dropdown.args = {
  children: 'Dropdown link',
  dropdown: true
}

export const DropdownToggle: StoryFN<LinkProps> = (args: LinkProps) => (
  <Link {...args} />
)

DropdownToggle.args = {
  children: 'Dropdown toggle',
  toggle: true
}

export const Nav: StoryFN<LinkProps> = (args: LinkProps) => <Link {...args} />

Nav.args = {
  children: 'Nav link',
  nav: true
}
