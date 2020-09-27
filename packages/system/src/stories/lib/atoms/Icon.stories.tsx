import { color, size, StoryFN } from '@kustomz-config'
import { Icon, IconProps } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Icon
 * @module stories/lib/atoms/Icon
 */

export default {
  argTypes: { color, size },
  component: Icon,
  title: 'Library/Atoms/Icon'
}

/**
 * Font Awesome {@link Icon} story.
 */
export const FontAwesome: StoryFN<IconProps> = (args: IconProps) => (
  <Icon {...args} />
)

FontAwesome.args = {
  className: 'fas fa-spinner fa-spin',
  color: 'light',
  size: '2xl'
}

/**
 * Material UI {@link Icon} story.
 */
export const MaterialUI: StoryFN<IconProps> = (args: IconProps) => (
  <Icon {...args} />
)

MaterialUI.args = {
  children: 'shopping_cart',
  color: 'primary',
  size: '4xl'
}
