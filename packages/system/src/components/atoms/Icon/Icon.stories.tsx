import { ligatures as children } from '@system/config'
import { StoryFN } from '@system/types/storybook'
import React from 'react'
import { Icon, IconProps } from './Icon'

/**
 * @file Stories - Icon
 * @module components/atoms/Icon/stories
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
  c: 'light',
  children: 'menu'
}

/**
 * Person {@link Icon} story.
 */
export const Person: StoryFN<IconProps> = (args: IconProps) => (
  <Icon {...args} />
)

Person.args = {
  c: 'light',
  children: 'person',
  className: 'o-25',
  outlined: false
}

/**
 * Search {@link Icon} story.
 */
export const Search: StoryFN<IconProps> = (args: IconProps) => (
  <Icon {...args} />
)

Search.args = {
  c: 'light',
  children: 'search'
}
