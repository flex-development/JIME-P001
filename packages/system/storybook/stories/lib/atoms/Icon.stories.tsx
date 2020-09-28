import { Icon, IconProps } from '@kustomz/lib'
import React from 'react'
import { ligatures as children, StoryFN } from '../../../config'

/**
 * @file Stories - Icon
 * @module stories/lib/atoms/Icon
 */

export default {
  argTypes: { children },
  component: Icon,
  parameters: {
    jest: ['Icon']
  },
  title: 'Library/Atoms/Icon'
}

/**
 * Menu {@link Icon} story.
 */
export const Menu: StoryFN<IconProps> = (args: IconProps) => <Icon {...args} />

Menu.args = {
  children: 'menu',
  className: 'text-light'
}

/**
 * Person {@link Icon} story.
 */
export const Person: StoryFN<IconProps> = (args: IconProps) => (
  <Icon {...args} />
)

Person.args = {
  children: 'person',
  className: 'text-light-25',
  outlined: false
}

/**
 * Search {@link Icon} story.
 */
export const Search: StoryFN<IconProps> = (args: IconProps) => (
  <Icon {...args} />
)

Search.args = {
  children: 'search',
  className: 'text-light'
}
