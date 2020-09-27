import { Link, LinkProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../../.storybook/config'

/**
 * @file Stories - Link
 * @module stories/lib/atoms/Link
 */

export default {
  component: Link,
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
  children: 'Learn More',
  className: 'btn btn-primary'
}

/**
 * {@link DropdownMenu} {@link Link} story.
 */
export const Dropdown: StoryFN<LinkProps> = (args: LinkProps) => (
  <Link {...args} />
)

Dropdown.args = {
  children: 'Dropdown Link',
  dropdown: true
}
